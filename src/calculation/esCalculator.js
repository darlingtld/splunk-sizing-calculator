var sv64 = {
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

var sv65 = {
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

var sv651 = {
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

var sv66 = {
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

var sv70 = {
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

function esSizingResult(idxNum,shNum,idxCPU,shCPU,idxMemory,shMemory){
	this.idxNum = idxNum;
	this.shNum = shNum;
	this.idxCPU = idxCPU;
	this.shCPU = shCPU;
	this.idxMemory = idxMemory;
	this.shMemory = shMemory;
}


// calculate the actual capacity of each data model
function calcActualCapacity(totalVolume, marginOfError, theoreticalCapacity){
	var actualCapacity = 0;
	if (totalVolume <= 2000){
		actualCapacity = theoreticalCapacity*(1-marginOfError);
	}else if (totalVolume <= 10000){
		actualCapacity = theoreticalCapacity*(1-marginOfError)*(1-0.2*totalVolume/10000);
	}else{
		actualCapacity = theoreticalCapacity*(1-marginOfError)*0.8;
	}
	return actualCapacity;
}

function calculate(inputs){
	
	// load inputs
	var eVolume = inputs.eVolume;
	var activeDMs = 0;
	var ntVolume = eVolume.networkTrafficVolume;
	if (ntVolume != 0) { activeDMs++; }
	var webVolume = eVolume.webVolume;
	if (webVolume != 0) { activeDMs++; }
	var authVolume = eVolume.authenticationVolume;
	if (authVolume != 0) { activeDMs++; }
	var totalVolume = ntVolume+webVolume+authVolume;
		
	sv = inputs.sv;
	var ntCapacity = sv.networkTrafficCapacity;
	var webCapacity = sv.webCapacity;
	var authCapacity = sv.authenticationCapacity;
	
	var ntParalleliation = sv.datamodelParalleliation;
	var webParalleliation = sv.datamodelParalleliation;
	var authParalleliation = sv.datamodelParalleliation;
	
	var targetIdxCPU = inputs.targetIdxCPU;
	var targetSHCPU = inputs.targetSHCPU;
	
	var correlationSearches = inputs.correlationSearches;
	var concurrentUsers = inputs.concurrentUsers;
	
	var marginOfError = inputs.marginOfError/100;
	
	var parallelTuning = inputs.parallelTuning;
	if (sv.version == "7.0" && parallelTuning.enabled){
		if (parallelTuning.networkTrafficParalleliation == 10){
			ntParalleliation = 10;
			ntCapacity = sv.networkTrafficParallel10Capacity;
		}else if (parallelTuning.networkTrafficParalleliation == 20){
			ntParalleliation = 20;
			ntCapacity = sv.networkTrafficParallel20Capacity;			
		}else if (parallelTuning.networkTrafficParalleliation == 3){
			ntParalleliation = 3;
			ntCapacity = sv.networkTrafficParallel3Capacity;			
		} else if (parallelTuning.networkTrafficParalleliation == 5){
			ntParalleliation = 5;
			ntCapacity = sv.networkTrafficParallel5Capacity;			
		} else{
			
		}

		if (parallelTuning.webParalleliation == 10){
			webParalleliation = 10;
			webCapacity = sv.webParallel10Capacity;
		} else if (parallelTuning.webParalleliation == 20){
			webParalleliation = 20;
			webCapacity = sv.webParallel20Capacity;			
		} else if (parallelTuning.webParalleliation == 3){
			webParalleliation = 3;
			webCapacity = sv.webParallel3Capacity;			
		} else if (parallelTuning.webParalleliation == 5){
			webParalleliation = 5;
			webCapacity = sv.webParallel5Capacity;			
		} else{
			
		}
		
		if (parallelTuning.authenticationParalleliation == 10){
			authParalleliation = 10;
			authCapacity = sv.authenticationParallel10Capacity;
		} else if (parallelTuning.authenticationParalleliation == 20){
			authParalleliation = 20;
			authCapacity = sv.authenticationParallel20Capacity;			
		} else if (parallelTuning.authenticationParalleliation == 3){
			authParalleliation = 3;
			authCapacity = sv.authenticationParallel3Capacity;			
		} else if (parallelTuning.authenticationParalleliation == 5){
			authParalleliation = 5;
			authCapacity = sv.authenticationParallel5Capacity;			
		}
		
	}
	
	var ntActualCapacity = calcActualCapacity(totalVolume,marginOfError,ntCapacity);
	var webActualCapacity = calcActualCapacity(totalVolume,marginOfError,webCapacity);
	var authActualCapacity = calcActualCapacity(totalVolume,marginOfError,authCapacity);
	console.log("The actual capacity of network traffic is"+ntActualCapacity);
	console.log("The actual capacity of web is "+webActualCapacity);
	console.log("The actual capacity of authentication is"+authActualCapacity);
	
	var minNTIndexers = Math.ceil(ntVolume/ntActualCapacity);
	var minWebIndexers = Math.ceil(webVolume/webActualCapacity);
	var minAuthIndexers = Math.ceil(authVolume/authActualCapacity);	
	var minIndexers = Math.max(minNTIndexers,minWebIndexers,minAuthIndexers);
	console.log("The minimum indexer number is "+minIndexers);
	
	
	// fix search load calculate issues
	var estimateSearchUsers = (correlationSearches/4 + concurrentUsers*sv.adhocSearchPerUser*sv.adhocSearchConcurrency)*2;
	var totalSearchCPUInIndexer = 0;
	if (estimateSearchUsers <= 16){
		totalSearchCPUInIndexer = estimateSearchUsers*Math.ceil(totalVolume/300)/(1-marginOfError);
	} else{
		totalSearchCPUInIndexer = estimateSearchUsers*Math.ceil(totalVolume/150)/(1-marginOfError);
	}

	console.log("The total search load in Indexer is  "+totalSearchCPUInIndexer);
	
	
	// calculate required indexers
	var currentIndexers = minIndexers;
	while(true){
		var ntCPUPerIndexer = ntVolume/currentIndexers/ntActualCapacity*ntParalleliation;
		var webCPUPerIndexer = webVolume/currentIndexers/webActualCapacity*webParalleliation;
		var authCPUPerIndexer = authVolume/currentIndexers/authActualCapacity*authParalleliation;
		var splunkdCPUPerIndexer = 1;
		var ingestPipeLineCPU = 0;
		if (sv.version == "7.0" && parallelTuning.enabled){
			ingestPipeLineCPU = 1;
		}
		var searchCPUPerIndexer = totalSearchCPUInIndexer/currentIndexers;
		var reservedCPUPerIndexer = Math.ceil(ntCPUPerIndexer+webCPUPerIndexer+authCPUPerIndexer+splunkdCPUPerIndexer+searchCPUPerIndexer+ingestPipeLineCPU);
		if (targetIdxCPU <= reservedCPUPerIndexer){
			currentIndexers ++;
		}else{
			break;
		}
	}
		
	// calculate required search heads
	var currentSH = 1;
	while(true){
		var corSearchCPUPerSH = correlationSearches/4*Math.min((totalVolume/1000),1)/(1-marginOfError)/currentSH;
		var adhocSearchCPUPerSH = concurrentUsers*sv.adhocSearchPerUser*sv.adhocSearchConcurrency/(1-marginOfError)/currentSH;
		var splunkdCPUPerSH = 1;
		var reservedCPUPerSH = Math.ceil(corSearchCPUPerSH+adhocSearchCPUPerSH+splunkdCPUPerSH);
		if (targetSHCPU <= reservedCPUPerSH){
			currentSH ++;
		}else{
			break;				
		}
	}
		
	// calculate required memory in each indexer
	var memoryPerIdx = Math.ceil(minIndexers*(activeDMs*sv.memoryPerDMA+sv.memoryPerCorSearch*correlationSearches/4+concurrentUsers*sv.adhocSearchPerUser*sv.adhocSearchConcurrency*sv.memoryPerAdhocSearch)/(1-marginOfError)/currentIndexers/4)*4;
	if (memoryPerIdx < 16) { memoryPerIdx = 16;}
		
	// calculate required memory in each search head
	var memoryPerSH = Math.ceil((0.5*totalVolume/1000*activeDMs+(0.00005*totalVolume+0.5)*correlationSearches/4+concurrentUsers*sv.adhocSearchPerUser*sv.adhocSearchConcurrency*sv.memoryPerAdhocSearch)/(1-marginOfError)/currentSH/4)*4;
	if (memoryPerSH < 16) { memoryPerSH = 16;}
	
	var tuningConfiguration = null;
	if (sv.version == "7.0" && parallelTuning.enabled){
		tuningConfiguration = new Object();
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
	
	var esSizingResult = {
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
	console.log("The required indexer number is "+esSizingResult.idxNum);
	console.log("The required indexer cpu is "+esSizingResult.idxCPU);
	console.log("The required indexer memory is "+esSizingResult.idxMemory);
	
	console.log("The required search head number is "+esSizingResult.shNum);
	console.log("The required search head cpu is "+esSizingResult.shCPU);
	console.log("The required search head memory is "+esSizingResult.shMemory);
	
	console.log("The network traffic paralleliation is "+esSizingResult.ntParalleliation);
	console.log("The web paralleliation is "+esSizingResult.webParalleliation);
	console.log("The authentication paralleliation is "+esSizingResult.authParalleliation);		
	
	return esSizingResult;
}	
	

export function esCalculate(key, im, sv){
	var inputs = new Object();
	inputs.eVolume = {
			networkTrafficVolume: im.get("networkTrafficVolume"),
			webVolume: im.get("webVolume"),
			authenticationVolume: im.get("authenticationVolume"),
	}
	inputs.sv = sv;
	inputs.targetIdxCPU = im.get("targetIdxCPU");
	inputs.targetSHCPU = im.get("targetSHCPU");
	inputs.correlationSearches = im.get("correlationSearches");
	inputs.concurrentUsers = im.get("concurrentUsers");
	inputs.marginOfError = im.get("marginOfError");
	
	var esSizingResult = null;
	
	if (inputs.sv == sv70){
		
		inputs.parallelTuning = {
				enabled: im.get("parallelEnable"),
				autoTuning: im.get("autoTuning"),
				networkTrafficParalleliation: im.get("networkTrafficParallel"),
				webParalleliation: im.get("webParallel"),
				authenticationParalleliation: im.get("authenticationParallel"),
			};
		if (inputs.parallelTuning.enabled == true && inputs.parallelTuning.autoTuning == true){
			console.log("start to do auto tuning.");
			ntParallelTuningList = [3,5,10,20];
			authParallelTuningList = [3,5,10,20];
			webParallelTuningList = [3,5,10,20];
			for (var i=0; i<ntParallelTuningList.length; i++){
				inputs.parallelTuning.networkTrafficParalleliation = ntParallelTuningList[i];
				for (var j=0; j<authParallelTuningList.length; j++){
					inputs.parallelTuning.authenticationParalleliation = authParallelTuningList[j];
					for (var k=0; k<webParallelTuningList.length; k++){
						inputs.parallelTuning.webParalleliation = webParallelTuningList[k];
						if (ntParallelTuningList[i]+authParallelTuningList[j]+webParallelTuningList[k]+2 <= inputs.targetIdxCPU) {
							console.log("try parallel: "+ntParallelTuningList[i]+" "+authParallelTuningList[j]+" "+webParallelTuningList[k]);
							var tempSizingResult = calculate(inputs);
							if (esSizingResult == null){
								esSizingResult = tempSizingResult;
							}else{
								if ((tempSizingResult.idxNum+tempSizingResult.shNum) < (esSizingResult.idxNum+esSizingResult.shNum)){
									console.log("find better solution"+esSizingResult);
									esSizingResult = tempSizingResult;
								}else if((tempSizingResult.idxNum+tempSizingResult.shNum) == (esSizingResult.idxNum+esSizingResult.shNum) && (tempSizingResult.ntParalleliation+tempSizingResult.webParalleliation+tempSizingResult.authParalleliation) < (esSizingResult.ntParalleliation+esSizingResult.webParalleliation+esSizingResult.authParalleliation)){
									console.log("find better solution"+esSizingResult);
									esSizingResult = tempSizingResult;
								}
							}
						} else{
							console.log(""+ntParallelTuningList[i]+" "+authParallelTuningList[j]+" "+webParallelTuningList[k]+ " can't apply because indexer CPU core is too small!");
						}

					}
				}
			}
			
			
		}else{
			esSizingResult = calculate(inputs);
		}
	}else{
		esSizingResult = calculate(inputs);
	}
	return esSizingResult;

}
