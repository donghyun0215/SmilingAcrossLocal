const attraction = Vue.createApp({
  data() {
    return {
      searchField:"",   //input search textbox
      displayField:"",          //display which API cate is being called 
      displayPlaceholder:"Search by attraction name!",   //placeholder
      attractionDict: [],  //main data dict (the clean data)
      attractionCat:[],         //dropdown category option
      FilteredAttByCat:[],      //the filtered data
      errorMsg: '',             //display err msg if any
      selected_cat :"All" ,   //dropdown selected option
      MRTlist:{},            //checkbox mrt {mrt:count}
      displayMRTlist:{},      //filtered list of mrt dict
      selectedMRT:[],          //checkbox mrt list
      buttonCount:0,         //when click button the count ++ 
      displaySeeMore: "<button type='button' class='btn btn-warning' >See More</button>"
    };
  },
  created(){
    this.getAttraction(this.searchField)
    }
  ,
  methods :{
    getAttraction(keyword){
      if(keyword.trim()==""){
        keyword ="adventure"
      }

      var options = {
        method: 'GET',
        url: 'https://tih-api.stb.gov.sg/content/v1/attractions/search?keyword='+ 
        keyword + "&language=en&apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
      };
      axios.request(options)
      .then(response=>{
          var attractionData = response.data.data;
          // console.log(attractionData)

          this.errorMsg =""

          for (i=0; i<attractionData.length; i++){
            var desc = attractionData[i].description;
            var name = attractionData[i].name;
            var type = attractionData[i].type; 
            var mrt = attractionData[i].nearestMrtStation.trim().toLowerCase()
            var rating= attractionData[i].rating
            var contact = attractionData[i].contact.primaryContactNo
            if(contact.trim() ==""){
              contact= "<span style='color:red'><i> undisclosed </i></span>"
            }
      
            var website = attractionData[i].officialWebsite
            if(website.trim() ==""){
              website = "Attraction.html"  //tbc
            }
            else if(! website.startsWith("http") ){
              website = "https://" + website + ' target="_blank"'
            }else{
              website = website + ' target="_blank"'
            }

            if(attractionData[i].businessHour.length >0){
              var bizTime = attractionData[i].businessHour[0].openTime + " - "+ attractionData[i].businessHour[0].closeTime 
            }else{
              var bizTime = "<span style='color:red'><i> undisclosed </i></span>"
            }
            var address = (attractionData[i].address.streetName + ", " + attractionData[i].address.postalCode)

            if(mrt.length>0){
            //clean the mrt data
              if(mrt.includes("/")){
                let mrtManyMany =[]
                let tempMrt = mrt.split("/")

                for (j=0; j<tempMrt.length; j++){
                  tempMrt[j] = this.validateMRT(tempMrt[j])
                  this.helperDictCount(tempMrt[j], this.MRTlist)

                  //for mrt name
                  if(! mrtManyMany.includes(tempMrt[j])){
                    mrtManyMany.push(tempMrt[j])}
                }
                mrt = mrtManyMany.join()
              }
              else if(mrt.includes(",")){
                let mrtManyMany =[]
                let tempMrt = mrt.split(",")
                for (k=0; k<tempMrt.length; k++){
                  tempMrt[k] = this.validateMRT(tempMrt[k])
                  this.helperDictCount(tempMrt[k], this.MRTlist)

                  if(! mrtManyMany.includes(tempMrt[k])){
                    mrtManyMany.push(tempMrt[k])}
                }
                mrt = mrtManyMany.join()
              }
              else{
                if(/\d/.test(mrt)){   //if got random noise
                  let newMRT =""
                  let tempMrt = mrt.split(" ")
                  for (l=0; l<tempMrt.length; l++){
                    if (/^[a-z]+$/i.test(tempMrt[l])){
                      tempMrt[l] = this.capitalizeLetter(tempMrt[l].trim())
                      newMRT +=tempMrt[l]}
                  }
                  mrt =newMRT
                  this.helperDictCount(mrt, this.MRTlist)

                }else{
                  mrt= this.validateMRT(mrt)
                  this.helperDictCount(mrt, this.MRTlist)
                }
              }
            }else{
              mrt ="nil"
              this.helperDictCount(mrt, this.MRTlist)
            }

            //image data
            if(!attractionData[i].images[0]){
              var photo = "./images/dummy-post-square-1.jpeg"
            }
            else{
              if(attractionData[i].images[0].url.startsWith("http")){
                var photo = attractionData[i].images[0].url
              }
              else if(attractionData[i].images[0].uuid.length >2){
                let temp_photo = attractionData[i].images[0].uuid
                var photo = "https://tih-api.stb.gov.sg/media/v1/download/uuid/" + temp_photo +"?apikey=MnqCCPlkgGWec8BPY7FeV8s7MkmBxP4h"
              }
            }
  
            //extract all the type available in this dataset
            if(! this.attractionCat.includes(type)){
              this.attractionCat.push(type)}

            //store in a main dict
            this.attractionDict.push({attraction:name,category:type, desc:desc, photo:photo , mrt:mrt, rating:rating, contact:contact, website:website, bizTime:bizTime , address:address,photo:photo })
          }
        
        //sort alphabatically
        this.attractionCat.sort()
        this.MRTlist = Object.keys(this.MRTlist).sort().reduce((r, k) => (r[k] = this.MRTlist[k], r), {});

        this.FilteredAttByCat = this.attractionDict   //update the display dict
        this.displayMRTlist = this.MRTlist

        //format the "Displaying list of.." to make it sounds legit
        if(keyword == "adventure" ||keyword == "arts" || keyword == "history&culture" || keyword =="nature&wildlife" || keyword =="Leisure&Recreation" ){
          this.displayField= "Singapore Key Attractions!"
        }else{
          this.displayField= keyword
        }

        this.displaySeeMore =""
        this.searchField=""
        this.displayPlaceholder="Search by attraction name!"
        return this.attractionDict
        
      }).catch(error=> {
        this.searchField=""
        this.displayField =keyword
        this.displaySeeMore =""
        this.displayPlaceholder = "Cannot find! Please enter another Attraction Name!"
        this.errorMsg="<span style='padding-top: 15px; font-size: small; color: red;'>No record found! Take a look at our recommended attractions? &nbsp;&nbsp;&nbsp;<button type='button' class='btn btn-danger btn-sm'>Yes!</button></span>"
      }
      )
  }, 
  buttonDisplay(){   //display 100 set of attraction -fk off duplication 
    this.buttonCount+=1;
    // console.log(this.buttonCount)
    let defaultkeyword= ['adventure','arts','history&culture', 'nature&wildlife', 'Leisure&Recreation']

    if(this.buttonCount<5){
      // console.log(defaultkeyword[this.buttonCount])
      this.getAttraction(defaultkeyword[this.buttonCount])
      this.displaySeeMore= "<button type='button' class='btn btn-warning' >See More</button>"
    }else{
      this.displaySeeMore= ""
    }
  },
  searchAttraction(){      //for input search , clear the initial data in dict
    this.buttonCount= -1;  //initialize buttonCount for later displaying part
    this.attractionDict=[]
    this.attractionCat=[]
    this.selected_cat = "All"
    this.MRTlist ={}
    this.displayMRTlist ={}
    this.selectedMRT=[]
    this.displaySeeMore =""

    this.getAttraction(this.searchField)
  },
  validateMRT(train){
    train = train.trim()
    if (train.includes("station")){
      train = train.split("station")[0].trim()
    }
    if (train.includes("mrt")){
      train = train.split("mrt")[0].trim()
    }
    train = this.capitalizeLetter(train)
    return train
  },
  capitalizeLetter(text){  //capitalize first char to make looks visually pleasing..
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  },
  helperDictCount(myObj,myDict){
      //for mrt checkbox list
      if (!myDict [myObj]){
        myDict[myObj] = 1;
      }else{
        myDict[myObj] +=1;        
      }
  },
  sweetAlert(name,rating,contact, website,bizTime,address, photo){
    if(website =="Attraction.html"){
      Swal.fire({
      
        title: '<span style="color: #1abc9c">'+name + '</span>',
        html: '<strong> Rating: </strong>' + rating +'<br><strong> Business Hour: </strong>'+ bizTime +'<br><strong>Address: </strong>'+ address + '<br><strong>Contact: </strong>'+ contact ,
        imageUrl: photo,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        width: '30rem',
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: 'Back!'
      })
    }else{

      Swal.fire({
        
        title: '<span style="color: #1abc9c">'+name + '</span>',
        html: '<strong> Rating: </strong>' + rating +'<br><strong> Business Hour: </strong>'+ bizTime +'<br><strong>Address: </strong>'+ address + '<br><strong>Contact: </strong>'+ contact ,
        footer: '<a href=' +website+ '>Visit Official Website</a> ' ,
        imageUrl: photo,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        width: '30rem',
        showCloseButton: true,
        focusConfirm: true,
        confirmButtonText: 'Back!'
      })
    }
  }
  },
  computed :{
    displaySelected(){
      // 1. choose nothing: set to default display setting
      if(this.selected_cat == "All" && this.selectedMRT.length ==0 ){
        this.FilteredAttByCat = this.attractionDict
        this.displayMRTlist = this.MRTlist
        for (x=0; x<this.attractionDict.length; x++){
          //extract all the type available in this dataset
          if(! this.attractionCat.includes(this.attractionDict[x].category)){
            this.attractionCat.push(this.attractionDict[x].category)}
        }

        if(this.displayField== "Singapore Key Attractions!"){
          this.displaySeeMore= "<button type='button' class='btn btn-warning' >See More</button>"
        }
        return
      }
      
      //2. if only select dropdown & nvr tick checkbox (reset mrt checkbox)
      let tempResult = []
      this.displaySeeMore=""
      if(this.selectedMRT.length ==0 ){  //means dropdown is not "All" 
      this.displayMRTlist ={}    //MRT checkbox will update
          for (i=0; i<this.attractionDict.length; i++){
            if(this.attractionDict[i].category == this.selected_cat){
              tempResult.push(this.attractionDict[i])
              
            //split the mrt comma string again...
            if(this.attractionDict[i].mrt.includes(",")){
              let tempMrt = this.attractionDict[i].mrt.split(",")
              for (j=0; j<tempMrt.length; j++){
                this.helperDictCount(tempMrt[j], this.displayMRTlist)
              }
            }else{
              this.helperDictCount(this.attractionDict[i].mrt, this.displayMRTlist)
            }
            }
            this.FilteredAttByCat = tempResult 
            this.displayMRTlist = Object.keys(this.displayMRTlist).sort().reduce((r, k) => (r[k] = this.displayMRTlist[k], r), {});
          }
      return
    }
    else{   //3. checkbox list >0 (split "All" case & the rest)
      // console.log(this.selected_cat)

      if (this.selected_cat !="All"){   //everything
      //   this.displayMRTlist = this.MRTlist
      //   this.attractionCat =[]
        for (m=0; m<this.selectedMRT.length; m++){
          for (n=0; n<this.attractionDict.length; n++){
            if(this.attractionDict[n].mrt.includes(this.selectedMRT[m]) && this.attractionDict[n].category == this.selected_cat && !tempResult.includes(this.attractionDict[n])){
              tempResult.push(this.attractionDict[n])
          }
        }
      }
      }
      else{
        for (m=0; m<this.selectedMRT.length; m++){
          for (n=0; n<this.attractionDict.length; n++){
            if(this.attractionDict[n].mrt.includes(this.selectedMRT[m]) && !tempResult.includes(this.attractionDict[n])){
              tempResult.push(this.attractionDict[n])
          }
        }
      }

      }
      this.FilteredAttByCat = tempResult 
      this.attractionCat =[]
      for (z=0; z<this.FilteredAttByCat.length; z++){
        //extract all the type available in this dataset
        if(! this.attractionCat.includes(this.FilteredAttByCat[z].category)){
          this.attractionCat.push(this.FilteredAttByCat[z].category)}
      }
    }  

    }
  }
})
const attraction_vm = attraction.mount('#attraction');


//Get the button:
mybutton = document.getElementById("TopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}