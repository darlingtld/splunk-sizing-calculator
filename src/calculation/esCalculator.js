const sv64 = {
    version: "6.4",
    splunkdCPU: 1,
    adhocSearchConcurrency: 0.5,
    datamodelParalleliation: 2,
    adhocSearchPerUser: 3,
    memoryPerCorSearch: 1,
    memoryPerDMA: 1,
    memoryPerAdhocSearch: 0.5,
    authenticationCapacity: 140,
    networkTrafficCapacity: 20,
    webCapacity: 180,
};

const sv65 = {
    version: "6.5",
    splunkdCPU: 1,
    adhocSearchConcurrency: 0.5,
    datamodelParalleliation: 2,
    adhocSearchPerUser: 3,
    memoryPerCorSearch: 1,
    memoryPerDMA: 1,
    memoryPerAdhocSearch: 0.5,
    authenticationCapacity: 150,
    networkTrafficCapacity: 30,
    webCapacity: 200,
};

const sv651 = {
    version: "6.5.1612",
    splunkdCPU: 1,
    adhocSearchConcurrency: 0.5,
    datamodelParalleliation: 2,
    adhocSearchPerUser: 3,
    memoryPerCorSearch: 1,
    memoryPerDMA: 1,
    memoryPerAdhocSearch: 0.5,
    authenticationCapacity: 150,
    networkTrafficCapacity: 30,
    webCapacity: 200,
};

const sv66 = {
    version: "6.6",
    splunkdCPU: 1,
    adhocSearchConcurrency: 0.5,
    datamodelParalleliation: 3,
    adhocSearchPerUser: 3,
    memoryPerCorSearch: 1,
    memoryPerDMA: 1,
    memoryPerAdhocSearch: 0.5,
    authenticationCapacity: 250,
    networkTrafficCapacity: 40,
    webCapacity: 470,
};

const sv70 = {
    version: "7.0",
    splunkdCPU: 1,
    adhocSearchConcurrency: 0.5,
    datamodelParalleliation: 3,
    adhocSearchPerUser: 3,
    memoryPerCorSearch: 1,
    memoryPerDMA: 1,
    memoryPerAdhocSearch: 0.5,
    authenticationCapacity: 330,
    networkTrafficCapacity: 60,
    webCapacity: 1350,
    authenticationParallel3Capacity: 700,
    networkTrafficParallel3Capacity: 140,
    webParallel3Capacity: 1400,
    authenticationParallel5Capacity: 1200,
    networkTrafficParallel5Capacity: 230,
    webParallel5Capacity: 2500,
    authenticationParallel10Capacity: 2100,
    networkTrafficParallel10Capacity: 420,
    webParallel10Capacity: 2500,
    authenticationParallel20Capacity: 2500,
    networkTrafficParallel20Capacity: 740,
    webParallel20Capacity: 2500,
};

function esSizingResult(idxNum, shNum, idxCPU, shCPU, idxMemory, shMemory) {
    this.idxNum = idxNum;
    this.shNum = shNum;
    this.idxCPU = idxCPU;
    this.shCPU = shCPU;
    this.idxMemory = idxMemory;
    this.shMemory = shMemory;
}


// calculate the actual capacity of each data model
function calcActualCapacity(totalVolume, marginOfError, theoreticalCapacity) {
    let actualCapacity = 0;
    if (totalVolume <= 2000) {
        actualCapacity = theoreticalCapacity * (1 - marginOfError);
    } else if (totalVolume <= 10000) {
        actualCapacity = theoreticalCapacity * (1 - marginOfError) * (1 - 0.2 * totalVolume / 10000);
    } else {
        actualCapacity = theoreticalCapacity * (1 - marginOfError) * 0.8;
    }
    return actualCapacity;
}

function calculate(inputs) {

    // load inputs
    let eVolume = inputs.eVolume;
    let activeDMs = 0;
    let ntVolume = eVolume.networkTrafficVolume;
    if (ntVolume != 0) {
        activeDMs++;
    }
    let webVolume = eVolume.webVolume;
    if (webVolume != 0) {
        activeDMs++;
    }
    let authVolume = eVolume.authenticationVolume;
    if (authVolume != 0) {
        activeDMs++;
    }
    let totalVolume = ntVolume + webVolume + authVolume;

    let sv = inputs.sv;
    let ntCapacity = sv.networkTrafficCapacity;
    let webCapacity = sv.webCapacity;
    let authCapacity = sv.authenticationCapacity;

    let ntParalleliation = sv.datamodelParalleliation;
    let webParalleliation = sv.datamodelParalleliation;
    let authParalleliation = sv.datamodelParalleliation;

    let targetIdxCPU = inputs.targetIdxCPU;
    let targetSHCPU = inputs.targetSHCPU;

    let correlationSearches = inputs.correlationSearches;
    let concurrentUsers = inputs.concurrentUsers;

    let marginOfError = inputs.marginOfError / 100;

    let parallelTuning = inputs.parallelTuning;
    if (sv.version === "7.0" && parallelTuning.enabled) {
        if (parallelTuning.networkTrafficParalleliation === 10) {
            ntParalleliation = 10;
            ntCapacity = sv.networkTrafficParallel10Capacity;
        } else if (parallelTuning.networkTrafficParalleliation === 20) {
            ntParalleliation = 20;
            ntCapacity = sv.networkTrafficParallel20Capacity;
        } else if (parallelTuning.networkTrafficParalleliation === 3) {
            ntParalleliation = 3;
            ntCapacity = sv.networkTrafficParallel3Capacity;
        } else if (parallelTuning.networkTrafficParalleliation === 5) {
            ntParalleliation = 5;
            ntCapacity = sv.networkTrafficParallel5Capacity;
        } else {

        }

        if (parallelTuning.webParalleliation === 10) {
            webParalleliation = 10;
            webCapacity = sv.webParallel10Capacity;
        } else if (parallelTuning.webParalleliation === 20) {
            webParalleliation = 20;
            webCapacity = sv.webParallel20Capacity;
        } else if (parallelTuning.webParalleliation === 3) {
            webParalleliation = 3;
            webCapacity = sv.webParallel3Capacity;
        } else if (parallelTuning.webParalleliation === 5) {
            webParalleliation = 5;
            webCapacity = sv.webParallel5Capacity;
        } else {

        }

        if (parallelTuning.authenticationParalleliation === 10) {
            authParalleliation = 10;
            authCapacity = sv.authenticationParallel10Capacity;
        } else if (parallelTuning.authenticationParalleliation === 20) {
            authParalleliation = 20;
            authCapacity = sv.authenticationParallel20Capacity;
        } else if (parallelTuning.authenticationParalleliation === 3) {
            authParalleliation = 3;
            authCapacity = sv.authenticationParallel3Capacity;
        } else if (parallelTuning.authenticationParalleliation === 5) {
            authParalleliation = 5;
            authCapacity = sv.authenticationParallel5Capacity;
        }

    }

    let ntActualCapacity = calcActualCapacity(totalVolume, marginOfError, ntCapacity);
    let webActualCapacity = calcActualCapacity(totalVolume, marginOfError, webCapacity);
    let authActualCapacity = calcActualCapacity(totalVolume, marginOfError, authCapacity);
    console.log("The actual capacity of network traffic is" + ntActualCapacity);
    console.log("The actual capacity of web is " + webActualCapacity);
    console.log("The actual capacity of authentication is" + authActualCapacity);

    let minNTIndexers = Math.ceil(ntVolume / ntActualCapacity);
    let minWebIndexers = Math.ceil(webVolume / webActualCapacity);
    let minAuthIndexers = Math.ceil(authVolume / authActualCapacity);
    let minIndexers = Math.max(minNTIndexers, minWebIndexers, minAuthIndexers);
    console.log("The minimum indexer number is " + minIndexers);


    // fix search load calculate issues
    let estimateSearchUsers = (correlationSearches / 4 + concurrentUsers * sv.adhocSearchPerUser * sv.adhocSearchConcurrency) * 2;
    let totalSearchCPUInIndexer = 0;
    if (estimateSearchUsers <= 16) {
        totalSearchCPUInIndexer = estimateSearchUsers * Math.ceil(totalVolume / 300) / (1 - marginOfError);
    } else {
        totalSearchCPUInIndexer = estimateSearchUsers * Math.ceil(totalVolume / 150) / (1 - marginOfError);
    }

    console.log("The total search load in Indexer is  " + totalSearchCPUInIndexer);


    // calculate required indexers
    let currentIndexers = minIndexers;
    while (true) {
        let ntCPUPerIndexer = ntVolume / currentIndexers / ntActualCapacity * ntParalleliation;
        let webCPUPerIndexer = webVolume / currentIndexers / webActualCapacity * webParalleliation;
        let authCPUPerIndexer = authVolume / currentIndexers / authActualCapacity * authParalleliation;
        let splunkdCPUPerIndexer = 1;
        let ingestPipeLineCPU = 0;
        if (sv.version === "7.0" && parallelTuning.enabled) {
            ingestPipeLineCPU = 1;
        }
        let searchCPUPerIndexer = totalSearchCPUInIndexer / currentIndexers;
        let reservedCPUPerIndexer = Math.ceil(ntCPUPerIndexer + webCPUPerIndexer + authCPUPerIndexer + splunkdCPUPerIndexer + searchCPUPerIndexer + ingestPipeLineCPU);
        if (targetIdxCPU <= reservedCPUPerIndexer) {
            currentIndexers++;
        } else {
            break;
        }
    }

    // calculate required search heads
    let currentSH = 1;
    while (true) {
        let corSearchCPUPerSH = correlationSearches / 4 * Math.min((totalVolume / 1000), 1) / (1 - marginOfError) / currentSH;
        let adhocSearchCPUPerSH = concurrentUsers * sv.adhocSearchPerUser * sv.adhocSearchConcurrency / (1 - marginOfError) / currentSH;
        let splunkdCPUPerSH = 1;
        let reservedCPUPerSH = Math.ceil(corSearchCPUPerSH + adhocSearchCPUPerSH + splunkdCPUPerSH);
        if (targetSHCPU <= reservedCPUPerSH) {
            currentSH++;
        } else {
            break;
        }
    }

    // calculate required memory in each indexer
    let memoryPerIdx = Math.ceil(minIndexers * (activeDMs * sv.memoryPerDMA + sv.memoryPerCorSearch * correlationSearches / 4 + concurrentUsers * sv.adhocSearchPerUser * sv.adhocSearchConcurrency * sv.memoryPerAdhocSearch) / (1 - marginOfError) / currentIndexers / 4) * 4;
    if (memoryPerIdx < 16 || isNaN(memoryPerIdx)) {
        memoryPerIdx = 16;
    }

    // calculate required memory in each search head
    let memoryPerSH = Math.ceil((0.5 * totalVolume / 1000 * activeDMs + (0.00005 * totalVolume + 0.5) * correlationSearches / 4 + concurrentUsers * sv.adhocSearchPerUser * sv.adhocSearchConcurrency * sv.memoryPerAdhocSearch) / (1 - marginOfError) / currentSH / 4) * 4;
    if (memoryPerSH < 16 || isNaN(memoryPerSH)) {
        memoryPerSH = 16;
    }

    let tuningConfiguration = null;
    if (sv.version === "7.0" && parallelTuning.enabled) {
        tuningConfiguration = {};
        tuningConfiguration.max_concurrent = {
            network_traffic: ntParalleliation,
            web: webParalleliation,
            authentication: authParalleliation,
        };
        tuningConfiguration.poll_buckets_until_maxtime = "false";
        tuningConfiguration.cron_schedule = "*/1 * * * *";
        tuningConfiguration.parallelIngestionPipelines = Math.max(ntParalleliation, webParalleliation, authParalleliation);
        tuningConfiguration.maxHotBuckets = Math.max(ntParalleliation, webParalleliation, authParalleliation);
        tuningConfiguration.max_searches_perc = "100";
        tuningConfiguration.bucket_refresh_interval = "30";
        tuningConfiguration.bucket_refresh_interval_cluster = "30";

    }

    let esSizingResult = {
        idxNum: currentIndexers,
        shNum: currentSH,
        idxCPU: targetIdxCPU,
        shCPU: targetSHCPU,
        idxMemory: memoryPerIdx,
        shMemory: memoryPerSH,
        ntParalleliation: ntParalleliation,
        webParalleliation: webParalleliation,
        authParalleliation: authParalleliation,
        tuningConfiguration: tuningConfiguration,
    };
    console.log("The required indexer number is " + esSizingResult.idxNum);
    console.log("The required indexer cpu is " + esSizingResult.idxCPU);
    console.log("The required indexer memory is " + esSizingResult.idxMemory);

    console.log("The required search head number is " + esSizingResult.shNum);
    console.log("The required search head cpu is " + esSizingResult.shCPU);
    console.log("The required search head memory is " + esSizingResult.shMemory);

    console.log("The network traffic paralleliation is " + esSizingResult.ntParalleliation);
    console.log("The web paralleliation is " + esSizingResult.webParalleliation);
    console.log("The authentication paralleliation is " + esSizingResult.authParalleliation);

    return esSizingResult;
}


export function esCalculate(data) {
    const inputs = {};
    inputs.eVolume = {
        networkTrafficVolume: data.networkTrafficTotal,
        webVolume: data.webTotal,
        authenticationVolume: data.authenticationTotal,
    };
    inputs.targetIdxCPU = data.indexerCores;
    inputs.targetSHCPU = data.searchHeadCores;
    inputs.correlationSearches = data.correlationSearches;
    inputs.concurrentUsers = data.concurrentUsers;
    inputs.marginOfError = data.marginOfError;

    var esSizingResult = null;

    if (data.splunkVersion === '7.0') {
        inputs.sv = sv70;
        inputs.parallelTuning = {
            enabled: data.parallelEnableChecked,
            autoTuning: data.autoTuningChecked,
            networkTrafficParalleliation: data.networkTrafficConcurrency,
            webParalleliation: data.webConcurrency,
            authenticationParalleliation: data.authenticationConcurrency,
        };
        if (inputs.parallelTuning.enabled === true && inputs.parallelTuning.autoTuning === true) {
            console.log("start to do auto tuning.");
            ntParallelTuningList = [3, 5, 10, 20];
            authParallelTuningList = [3, 5, 10, 20];
            webParallelTuningList = [3, 5, 10, 20];
            for (let i = 0; i < ntParallelTuningList.length; i++) {
                inputs.parallelTuning.networkTrafficParalleliation = ntParallelTuningList[i];
                for (let j = 0; j < authParallelTuningList.length; j++) {
                    inputs.parallelTuning.authenticationParalleliation = authParallelTuningList[j];
                    for (let k = 0; k < webParallelTuningList.length; k++) {
                        inputs.parallelTuning.webParalleliation = webParallelTuningList[k];
                        if (ntParallelTuningList[i] + authParallelTuningList[j] + webParallelTuningList[k] + 2 <= inputs.targetIdxCPU) {
                            console.log("try parallel: " + ntParallelTuningList[i] + " " + authParallelTuningList[j] + " " + webParallelTuningList[k]);
                            let tempSizingResult = calculate(inputs);
                            if (esSizingResult) {
                                esSizingResult = tempSizingResult;
                            } else {
                                if ((tempSizingResult.idxNum + tempSizingResult.shNum) < (esSizingResult.idxNum + esSizingResult.shNum)) {
                                    console.log("find better solution" + esSizingResult);
                                    esSizingResult = tempSizingResult;
                                } else if ((tempSizingResult.idxNum + tempSizingResult.shNum) === (esSizingResult.idxNum + esSizingResult.shNum) && (tempSizingResult.ntParalleliation + tempSizingResult.webParalleliation + tempSizingResult.authParalleliation) < (esSizingResult.ntParalleliation + esSizingResult.webParalleliation + esSizingResult.authParalleliation)) {
                                    console.log("find better solution" + esSizingResult);
                                    esSizingResult = tempSizingResult;
                                }
                            }
                        } else {
                            console.log(ntParallelTuningList[i] + " " + authParallelTuningList[j] + " " + webParallelTuningList[k] + " can't apply because indexer CPU core is too small!");
                        }

                    }
                }
            }


        } else {
            esSizingResult = calculate(inputs);
        }
    } else {
        if (data.splunkVersion === '6.6') {
            inputs.sv = sv66;
        } else if (data.splunkVersion === '6.5.1612') {
            inputs.sv = sv651;
        } else if (data.splunkVersion === '6.5') {
            inputs.sv = sv65;
        } else if (data.splunkVersion === '6.4') {
            inputs.sv = sv64;
        }
        esSizingResult = calculate(inputs);
    }
    return esSizingResult;

}
