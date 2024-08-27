let CALLING_APP = "sample-custom-components";
let ASSET_ICON = "BOOKMARK";
let ASSET_API_NAME = "bookmarks";

function truncate(str, len){
  var d = str.length > len ? '...' : '';
  return str.substring(0, len)+d;
};

async function main() {
    let element = document.querySelector(".table-assets");
    let unauthenticated = document.querySelector(".unauthenticated");
    let no_asset = document.querySelector(".no_asset");

    // If the user is unauthenticated
    if (user.isAuthenticated === false) {
        unauthenticated.style.display = 'block';
        no_asset.style.display = 'none';
        return;
    }

    let FTAPI = await new window.fluidtopics.FluidTopicsApi();
    FTAPI["ftCallingApp"] = CALLING_APP;
    let assets = await FTAPI.get(`/api/users/${user.profile.id}/${ASSET_API_NAME}`);

    // If the user is authenticated, but has no bookmark
    if (assets.length === 0) {
        unauthenticated.style.display = 'none';
        no_asset.style.display = 'block';
        return;
    }

    // Create an unordered list
    let ul = document.createElement("ul");

    // Iterate over bookmarks to create list items with icons and links
    assets.forEach(asset => {
        let li = document.createElement("li");

        // Create the <ft-icon> element
        let ftIcon = document.createElement("ft-icon");
        ftIcon.setAttribute("variant", "fluid-topics");
        ftIcon.setAttribute("style", `--ft-icon-font-size: 35px; color: ${asset.color};`); // Set color dynamically
        ftIcon.setAttribute("value", ASSET_ICON);
        li.appendChild(ftIcon);

        // Create the link (a) element
        let a = document.createElement("a");
        a.textContent = asset.title;
        a.href = asset.readerUrl ??  asset.viewerUrl; // Set @href attribute to readerUrl
        a.target = "_blank"; // Open link in a new tab
        
        if (asset.description) a.textContent += ' ('+truncate(asset.description, 30)+')';

        // Append the link to the list item
        li.appendChild(a);

        // Append the list item to the unordered list
        ul.appendChild(li);
    });

    // Clear the content of the element and append the unordered list
    element.innerHTML = "";
    element.appendChild(ul);
}
main();