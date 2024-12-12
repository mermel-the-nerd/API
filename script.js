let gods = [];
const cardDiv = document.getElementById('card')
const test = document.getElementById('stuff')
const testbutton = document.getElementById('testbutton')
const search = document.getElementById('search')
const drop = document.getElementById('dropdown-input')


fetch("https://thegreekmythapi.vercel.app/api/gods")
  .then((response) => response.json())
  .then((data) => {
    gods.push(...data.Gods); // Add gods data to the array
    return fetch("https://thegreekmythapi.vercel.app/api/titans");
  })
  .then((response) => response.json())
  .then((data) => {
     data.Titans.forEach((el, index) => {
      el.id = gods.length + index + 1; // Ensure IDs are unique
      gods.push(el); // Add each Titan to the gods array
    });
    //console.log(gods[1]);     // Now gods array will contain both gods and titans
    //that bit where i make manual edits to the API bc its missing info in places
    gods[1].attributes.family.parents.push("Metis")

    
    
  })
  .catch((error) => console.error("Error:", error));

  Promise.all(gods).then(() => {
    console.log('all loaded')
     
    
  })



  function showCard(name){
   
    let which =0
   for(let i=0;i<gods.length;i++){
    if(gods[i].name ==name){
        which =i;
    }
   }
   
    let gender = ["God", "Titan"].includes(gods[which].category) ? 'His' : 'Her';
   
    cardDiv.innerHTML= `
    
     <h3>${gods[which].name}</h3>
    <img src="${gods[which].image}" alt="">
    <p>${gods[which].description} ${gender} powers include 
   ${gods[which].attributes.powers.map(e => `${e}`).join(' and ').toLowerCase()}. ${gender} 
   symbols are: ${gods[which].attributes.symbols.map(e => `${e}`).join(' and ').toLowerCase()}</p>


    <p>Family: ${gods[which].attributes.family.parents[0]!=="None"? `${gender} 
        parents are ${gods[which].attributes.family.parents.map(e => `<a href="#" id="${e}">${e}</a>`).join(' and ')}.`:""}

        ${gods[which].attributes.family.siblings[0]!=="None"? `${gender} 
            siblings are ${gods[which].attributes.family.siblings.map(e => `<a href="#" id="${e}">${e}</a>`).join(', ')}.`:""}
    
        ${gods[which].attributes.family.spouse[0]!=="None"? `${gender} 
            spouse is <a href="#" id="${gods[which].attributes.family.spouse[0]}">${gods[which].attributes.family.spouse[0]}</a>.`:""}`
    
   
            if(gods[which].attributes.family.parents[0]!=="None"){
    gods[which].attributes.family.parents.map(name=> {
        document.getElementById(`${name}`).addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default navigation
            showCard(name); // Call the function to show the parent
        })
        })}

        if(gods[which].attributes.family.siblings[0]!=="None"){
    gods[which].attributes.family.siblings.map(name=> {
        document.getElementById(`${name}`).addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default navigation
            showCard(name); // Call the function to show the parent
        });
    })}

    if(gods[which].attributes.family.spouse[0]!=="None"){
        document.getElementById(`${gods[which].attributes.family.spouse[0]}`).addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default navigation
            showCard(gods[which].attributes.family.spouse[0]); // Call the function to show the parent
        });
    }



    

  

}

function searching(){
    drop.innerHTML=""
    let searchText = search.value.toLowerCase();
    let searchOptions = [];
    gods.forEach(e=> {e.name.toLowerCase().includes(searchText) ? searchOptions.push(e.name):""});
    searchOptions.slice(0,5)
    console.log(searchOptions)

    searchOptions.forEach( e=> {
        drop.innerHTML+=`<li><a id="${e}" class="dropdown-item" href="#">${e}</a></li>`   }

    )

    searchOptions.map(name=> {
        document.getElementById(`${name}`).addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default navigation
            showCard(name); // Call the function to show the parent
            search.value = ""
        });
    })

    
    
   
    drop.style.marginLeft = `${screen.width - search.offsetWidth}px`;
  
    
}

search.addEventListener('input', searching);

