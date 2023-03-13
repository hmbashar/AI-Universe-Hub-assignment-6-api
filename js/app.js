// Fetch All AI Universe
const fetchAllAiUniverse = async (sort, dataLimit) => {
	try {
		const url = 'https://openapi.programming-hero.com/api/ai/tools';
		const response = await fetch(url);
		const data = await response.json();
		showAiUniverse(data.data, sort, dataLimit);
	}
	catch (error) {
		console.log(error);
	}

}




//Preloader
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner-loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


//data limit
const processShowAll = (sort, dataLimit) => {	
	toggleSpinner(true);
	fetchAllAiUniverse(sort, dataLimit);
}


//modal data hub left column
const displayHubLeftDetails = (data) => {
	const modalPriceDetails = document.getElementById('ai-universe-price'); // set pricing list

	const modalDescription = document.getElementById('single-item-desc'); // for description

	
	modalPriceDetails.innerHTML = `	
		
		<!-- Single Price -->
		<div class="ai-universe-price-single py-3 px-4 rounded-4 text-center d-flex align-items-center">
			<p class="text-success fw-bold m-0"><span id="free-plan-price">${data.data.pricing ? data.data.pricing[0].price : 'Free of Cost'}</span><br><span id="free-plan-name">${data.data.pricing ? data.data.pricing[0].plan : '/Basic'}</span></p>
		</div><!--/ Single Price -->

		<!-- Single Price -->
		<div class="ai-universe-price-single py-3 px-4 rounded-4 text-center d-flex align-items-center">
			<p class="text-success fw-bold m-0" style="color:#F28927 !important"><span id="pro-plan-price">${data.data.pricing ? data.data.pricing[1].price : 'Free of Cost'}</span><br><span id="pro-plan-name">${data.data.pricing ? data.data.pricing[0].plan : '/Pro'}</span></p>
		</div><!--/ Single Price -->

		<!-- Single Price -->
		<div class="ai-universe-price-single py-3 px-4 rounded-4 text-center d-flex align-items-center">
			<p class="text-danger fw-bold m-0"><span id="enter-plan-price">${data.data.pricing ? data.data.pricing[2].price : 'Free of Cost'}</span><br><span id="enter-plan-name">${data.data.pricing ? data.data.pricing[2].plan : '/Enterprise'}</span></p>
		</div><!--/ Single Price -->
		
	`;
	modalDescription.innerText = data.data.description;	


}



// modal data hub right column
const displayHubRightDetails = data => {
	//console.log(data.data);
	const modalRightContent = document.getElementById('ai-modal-right-content');
	const modalRightDiv = document.createElement('div');
	modalRightContent.textContent = ''; // clear previous data
	modalRightDiv.innerHTML = 	`
		<div class="ai-universe-module-img position-relative text-end">
			<div id="aiModal-img">
				<img class="img-fluid w-100" src="${data.data.image_link[0]}" alt=""/>
			</div>
			<div class="position-absolute z-1 bg-danger text-white py-2 px-3 rounded-3 ${data.data.accuracy.score ? 'd-block': 'd-none'}">${data.data.accuracy.score*100}% Accuracy</div>
		</div>
		<h2 class="fw-semibold mt-3 text-center fs-4">${data.data.input_output_examples ? data.data.input_output_examples[0].input : 'Can you give any example?'}</h2>
		<p class="text-center">${data.data.input_output_examples ? data.data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
	`;
	modalRightContent.appendChild(modalRightDiv);


}

// display modal data
const displayHubDetails = async hubID => {	
	const url = `https://openapi.programming-hero.com/api/ai/tool/${hubID}`;
	const res = await fetch(url);
	const data = await res.json();
	//console.log(data.data);

	//display left column on modal
	displayHubLeftDetails(data);
	//display right column on modal
	displayHubRightDetails(data);
	
	//modal feature list 
	modalFeatureList(data);

	//modal integration list 
	modalIntegrationList(data);


}

//modal integration list 
const modalIntegrationList = (data) => {
	const integrationDiv = document.getElementById('feature-integrations');
	const createIntegration = document.createElement('ul');
	createIntegration.classList.add('m-0');
	createIntegration.classList.add('ps-3');

	integrationDiv.innerHTML = '';

	const integrations = data.data.integrations;
	
	if(integrations != null && integrations.length > 0) {
		for(const integration in integrations) {			
			createIntegration.innerHTML += `<li>${integrations[integration]}</li>`;
		}
	}else {
		createIntegration.innerHTML += `<li>No Data Found</li>`;
	}
	
	
	integrationDiv.appendChild(createIntegration);
}

//modal feature list 
const modalFeatureList = (data) => {
	const featureList = document.getElementById('feature-list-container');
	const FeatureLi = document.createElement('ul');

	FeatureLi.classList.add('m-0');
	FeatureLi.classList.add('ps-3');

	featureList.innerText = '';

	let FeatureDataList = data.data.features; 
	
	for (const singleFeatureID in FeatureDataList) {		
        const singleFeature = FeatureDataList[singleFeatureID];		
		FeatureLi.innerHTML += `<li>${singleFeature.feature_name}</li>`;
	};

	featureList.appendChild(FeatureLi);
}


	
// Sort Date
const shorting = (a, b) => {
	
	const dateA = new Date(a.published_in);
	const dateB = new Date(b.published_in);
	if( dateA < dateB){
		return 1;
	}else if( dateA > dateB ){
		return -1;
	}
	else{

		return 0;
	}
	

}

// Show All AI Universe 
const showAiUniverse = (data, sort, dataLimit) => {
	toggleSpinner(false);
    const aiUniverseContainer = document.getElementById('all-ai-universe-hub');
	aiUniverseContainer.innerHTML = '';
	const ShowAllPosts = data.tools;
	const showAllBTN = document.getElementById('ai-universe-see-more');

	if( dataLimit && ShowAllPosts.length > dataLimit && sort === true) {
		AllPosts = ShowAllPosts.sort(shorting).slice(0, dataLimit);
		showAllBTN.classList.remove('d-none');
	}else if( dataLimit && ShowAllPosts.length > dataLimit) {
		AllPosts = ShowAllPosts.slice(0, dataLimit);
		showAllBTN.classList.remove('d-none');
	}
	
	else {
		AllPosts = ShowAllPosts;
		showAllBTN.classList.add('d-none');
	}


	
   AllPosts.forEach(singleItem => {
		
        aiUniverseContainer.innerHTML += `
		<div class="col">
			<div class="card h-100 p-4 rounded">
				<img src="${singleItem.image}" class="card-img-top rounded" alt="...">
				<div class="card-body-content">
					<h5 class="card-title fw-bold mt-3">Features</h5>
					<ol class="feature-list ps-3 mb-2" id="feature-list-id">		
						
					<li>${singleItem.features[0] ? singleItem.features[0] : 'Not Found!'}</li>
					<li>${singleItem.features[1] ? singleItem.features[1] : 'Not Found!'}</li>
					<li>${singleItem.features[2] ? singleItem.features[2] : 'Not Found!'}</li>
					
					</ol>
				</div>
				<div class="card-footer-content border-top pt-2">
					<div class="row align-items-center">
						<div class="col-md-7 text-start">
							<h5 class="card-title fw-bold">${singleItem.name}</h5>
							<span class="d-flex align-items-center gap-1 text-secondary fs-6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-day" viewBox="0 0 16 16">
                            <path d="M4.684 12.523v-2.3h2.261v-.61H4.684V7.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V9.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V8.418h-.672v4.105z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                          </svg> ${singleItem.published_in}</span>
						</div>
						<div class="col-md-5 text-end">
							<button type="button" class="btn ai-univer-button" data-bs-toggle="modal" data-bs-target="#AiUniverseHubModal" onclick="displayHubDetails('${singleItem.id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EB5757" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
	                        </button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		`;

		
    })
}


//show all when clicked show all button
document.getElementById('ai-universe-see-more').addEventListener('click', function() {
	processShowAll();
});


//sort by date toggle button
let clicked = 0;
document.getElementById('sort-by-date').addEventListener('click',function(){	
	 clicked++;
	 if(clicked % 2 === 1) {
		processShowAll(true, 6); //sorting
	 }else {
		processShowAll(false, 6);
	 }	
})




//ins data
processShowAll(null, 6);