document.getElementById("allContents").style.display = "none";

function getScrollbarWidth() {
	// Creating invisible container
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	const inner = document.createElement('div');
	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;
}

document.body.onscroll = function myFunction() { 
	var scrolltotop = document.scrollingElement.scrollTop;
	var target = document.getElementById("storySection");
	var xvalue = "center";
	var factor = 0.25;
	var yvalue = scrolltotop * factor;
	target.style.backgroundPosition = xvalue + " " + yvalue + "px";
}

function cumulativeOffset(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop  || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);

	return {
		top: top,
		left: left
	};
};

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

/*function initializeStorySection() {
	var storySectionShadowSize = 10.0;
	var storySectionTranslation = cumulativeOffset(document.getElementById("storySection")).left + storySectionShadowSize;
	document.getElementById("storySection").style.width = document.body.clientWidth - getScrollbarWidth() + 2.0 * storySectionShadowSize + "px";
	document.getElementById("storySection").style.paddingLeft = storySectionTranslation + "px";
	document.getElementById("storySection").style.paddingRight = storySectionTranslation + "px";
	document.getElementById("storySection").style.transform = "translateX(-" + storySectionTranslation +"px)";
}*/

function toggleMenu() {
	var style = document.getElementById("navbar-contacts").style;
	// console.log(style.display);
	if (style.display == "none" || style.display == "") {
		style.display = "inline-block";
	} else {
		style.display = "none";
	}
}

var currentLangCode = "en";

function changeLanguage(langCode) {
	currentLangCode = langCode;
	
	UpdateFeatureItems();
	UpdatePressKitButton();
	UpdateLogo();
	UpdateDescription();
	UpdateSectionNames();
	UpdateStory();
	UpdateDevelopers();
	UpdateDemoSection();
	UpdateNewsletterSection();
	UpdateDevelopmentStatusSection();
	UpdateFooter();
}

var contentJson = JSON.parse(document.getElementById("contentJson").innerHTML);

function UpdateSectionNames() {
	var sections =  document.getElementsByClassName("MainContentSection");
	for (var i = 0; i < sections.length; i++) {
		sections[i].getElementsByTagName("h2")[0].innerHTML = contentJson.sectionNames[sections[i].id][currentLangCode];
	}
}

function UpdateFooter() {
	document.getElementById("footer").getElementsByTagName("span")[0].innerHTML = contentJson.footer[0][currentLangCode];
	document.getElementById("footer").getElementsByTagName("span")[1].innerHTML = contentJson.footer[1][currentLangCode];
}

function UpdateDevelopmentStatusSection() {
	document.getElementById("developmentStatusSectionParagraphs").innerHTML = "";
	
	for (var i = 0; i < contentJson.developmentStatus[currentLangCode].length; i++) {
		var paragraph = document.createElement("p");
		paragraph.innerHTML = contentJson.developmentStatus[currentLangCode][i];
		document.getElementById("developmentStatusSectionParagraphs").appendChild(paragraph);
	}
}

function UpdateNewsletterSection() {
	document.getElementById("newsletterButton").innerHTML = contentJson.newsletterButton[currentLangCode];
	document.getElementById("newsletterButton").parentNode.closest("a").href = contentJson.newsletterSubscriptionLink[currentLangCode];
}

function UpdatePressKitButton() {
	document.getElementById("pressKitButton").innerHTML = contentJson.pressKitButton[currentLangCode];
}

function UpdateLogo() {
	var logo = document.getElementById("logo");
	logo.src = contentJson.logoFilePaths[currentLangCode];
}

function UpdateDescription() {
	var description = document.getElementById("headingDescription");
	description.innerHTML = contentJson.description[currentLangCode];
}

function UpdateFeatureItems() {
	var featureJson = contentJson.features;
	var featureItems = document.getElementById("feature-items");
	var featureItemList = [];
	
	for (var i = 0; i < featureItems.childNodes.length; i++) {
		if (featureItems.childNodes[i].className == "feature-item") {
			featureItemList.push(featureItems.childNodes[i]);
		}
	}
	
	for (var i = 0; i < featureItemList.length; i++) {
		var featureItem = featureItemList[i];
		
		featureItem.getElementsByTagName("div")[0].getElementsByTagName("h3")[0].innerHTML = featureJson[i].title[currentLangCode];
		featureItem.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML = featureJson[i].content[currentLangCode];
	}
}

function UpdateStory() {
	var storySection = document.getElementById("storySection");
	storySection.getElementsByTagName("p")[0].innerHTML = contentJson.story[currentLangCode];
}

function UpdateDevelopers() {
	var developersSection = document.getElementById("developersSection");
	developersSection.getElementsByTagName("p")[0].innerHTML = contentJson.developers[0][currentLangCode];
	developersSection.getElementsByTagName("p")[1].innerHTML = contentJson.developers[1][currentLangCode];
}

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	return template.content.firstChild;
}

function UpdateDemoSection() {
	var section = document.getElementById("demoSection");
	section.getElementsByTagName("p")[0].innerHTML = contentJson.demo.paragraph[currentLangCode];
	// section.getElementsByTagName("button")[0].innerHTML = contentJson.demo.downloadDutton[currentLangCode];
	// section.getElementsByTagName("p")[1].innerHTML = contentJson.demo.disclaimer[currentLangCode];
}

function InitializeFeatureItems () {
	var featureJson = contentJson.features;

	var featureItems = document.getElementById("feature-items");
	var featureItemTemplate = document.getElementById("feature-item-template");
	
	for (var i = 0; i < featureJson.length; i++) {
		var featureItem = featureItemTemplate.cloneNode(true);
		featureItem.removeAttribute("id");
		
		featureItem.getElementsByTagName("div")[0].getElementsByTagName("h3")[0].innerHTML = featureJson[i].title[currentLangCode];
		featureItem.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML = featureJson[i].content[currentLangCode];
		featureItem.getElementsByTagName("video")[0].getElementsByTagName("source")[0].src = featureJson[i].media;
		
		if (i % 2 != 0) {
			featureItem.appendChild(featureItem.childNodes[1]);
		}
		
		featureItems.appendChild(featureItem);
	}
	featureItemTemplate.remove();
}

function InitializeFooterContacts() {
	var navbarContacts = document.getElementById("navbar-contacts");
	var footerContacts = document.getElementById("footerContacts");
	for (var i = 0; i < navbarContacts.childNodes.length; i++) {
		footerContacts.appendChild(navbarContacts.childNodes[i].cloneNode(true));
	}
}

InitializeFeatureItems();
InitializeFooterContacts();

changeLanguage(currentLangCode);
/*
if (/^zh\b/.test(navigator.language)) {
	changeLanguage("zh_hk");
} else {
	changeLanguage(currentLangCode);
}
*/

document.getElementById("allContents").style.display = "initial";