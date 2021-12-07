

const reward = Vue.createApp({
  data() {
    return {
        productCat:{},
        pointCat:{"0_500":"UNDER 500","501_1000":"501-1000","1001_2000":"1001 & ABOVE"},
        productDict:[],
        filtertype:[],
        filterpoint:[],
        productfilter:[],
        searchfield:"",
        sorttype:"Points",
        iconButton:"<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-down-alt' style='color:white' ></i></button>",
        iconButton2: "<button class='btn btn-secondary btn-block'><i class='fas fa-sort-alpha-down' style='color:white'></i></button>",
        userpoints: localStorage.getItem('user_points'),
        msg: "",
        displayproduct:""
    };
}, 
  created(){
    var options = {
      method: 'GET',
      url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
      params: {country: 'singapore', lang: 'en_sg', currentpage: '0', pagesize: '30'},
      headers: {
        'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
        'x-rapidapi-key': 'b4b2a34742msh33d120726d73126p146316jsn5d5064a3141b'
      }
    };
    
      
      axios.request(options)
      .then(response=>{
        // console.log(response.data);
        var productdata = response.data;
        this.ProductDetails(productdata);
        this.filterbycategories(this.productDict);
        this.sortbytype();
        // this.productfilter = this.productDict;
        // console.log(this.productfilter)
        
      }).catch(function (error) {
        console.error(error);
      });
      
    
    
  },
  methods:{
    redeempoint(productprice){
      // split dollar sign and number e.g. $ 49.99
      var splitprice = productprice.split("$ ");
      var actualprice = Number(splitprice[1]);
      var points = 0;

      if(Number(actualprice) < 20){
        points = 200
      }else if(Number(actualprice)<30){
        points = 400
      }else if(Number(actualprice)<40){
        points = 600
      }else if(Number(actualprice)< 50){
        points = 800
      }else if(Number(actualprice)< 60){
        points = 1000
      }else{
        points = 1500
      }
      return points
      
    },
    ProductDetails(productdata) {
      for (i=0; i<productdata.results.length; i++){
        // put the data into a dictionary {{product: productname, category：category, img：image, price：price},}
        var productName = productdata.results[i].name;
        var productcategory = productdata.results[i].categoryName;
        var productimage = productdata.results[i].images[0].url;
        var productprice = productdata.results[i].price.formattedValue;
        var points = this.redeempoint(productprice);

        if(!this.productDict[productimage]){
          this.productDict.push({product:productName,category:productcategory, image:productimage, point:points, price:productprice}) ;
        }

      
        // retrive category data and put in a dictionary with total number of count {ladies:0, kids:0, men:0}
        if (!this.productCat[productcategory]){
          this.productCat[productcategory] = 1;
        }else{
          this.productCat[productcategory] +=1;        
        }
      }

      
      return this.productDict;
    },
    filterbycategories(data){
      var filterdata = [];
      if(this.searchfield !=""){
        data=this.searchproduct()
      }
      
      if(this.filterpoint.length !=0 && this.filtertype.length !=0){
        var firstdata = [];
        
        for (var i=0; i<this.filtertype.length; i++){
          for (var j=0; j<Object.keys(data).length; j++){
            if (this.filtertype[i]==data[j].category){
              firstdata.push(data[j])
            }
          }
        }
        for (var i=0; i<this.filterpoint.length; i++){
          var minNu= this.filterpoint[i].split("_")[0];
          var maxNu = this.filterpoint[i].split("_")[1];
          
          for (var j=0; j<Object.keys(firstdata).length; j++){
            if (firstdata[j].point>=minNu && firstdata[j].point<=maxNu){
              filterdata.push(firstdata[j])
            }
          }
        }
      }
      else if (this.filterpoint.length !=0 && this.filtertype.length==0){
        
        for (var i=0; i<this.filterpoint.length; i++){
          var minNu= this.filterpoint[i].split("_")[0];
          var maxNu = this.filterpoint[i].split("_")[1];
          for (var j=0; j<Object.keys(data).length; j++){
            if (data[j].point>=minNu &&data[j].point<=maxNu){
              filterdata.push(data[j])
            }
          }
        }
      }else if(this.filterpoint.length ==0 && this.filtertype.length !=0){       
        for (var i=0; i<this.filtertype.length; i++){
          for (var j=0; j<Object.keys(data).length; j++){
            if (this.filtertype[i]==data[j].category){
              filterdata.push(data[j])
            }
          }
        }
      }else{
        if(this.searchfield !=""){
          filterdata=this.searchproduct()
        }else{
          filterdata= data;        
        }
      }

      if(filterdata.length==0){
        this.msg ="Sorry, no product found!"
      }
      
      this.productfilter = filterdata;
      this.sortbytype();
      return this.productfilter;
    },
    sortbytype(){
      if(this.sorttype=="Points"){
        if(this.iconButton =="<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-down-alt' style='color:white' ></i></button>"){
          this.productfilter.sort( function ( a, b ) { return a.point - b.point; } )
        }else{
          this.productfilter.sort( function ( a, b ) { return b.point - a.point; } )
        }    
      }else{
        if(this.iconButton =="<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-down-alt' style='color:white' ></i></button>"){
          this.productfilter.sort(function (a,b){if (a.product<b.product){return-1}else if(a.product>b.product){return 1}else{return 0}})
        }else{
          this.productfilter.sort(function (a,b){if (a.product<b.product){return 1}else if(a.product>b.product){return -1}else{return 0}})
        }
      }
      return this.productfilter
    },
    clickIcon(){
      if(this.iconButton == "<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-down-alt' style='color:white' ></i></button>" ){
        this.iconButton = "<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-up' style='color:white'></i></button>"
      }else{
        this.iconButton = "<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-amount-down-alt' style='color:white' ></i></button>" 
      }
    },
    changebutton(){
      if(this.sorttype=="Name"){
        this.iconButton = "<button class='btn btn-block' style='background-color: #FF9900'><i class='fas fa-sort-alpha-down' style='color:white'></i></button>"
      }else{
        this.iconButton == "<button class='btnbtn-block' style='background-color: #FF9900'><i class='fas fa-sort-alpha-down-alt' style='color:white'></i></button>" 
      }
    },
    searchproduct(){
      var usersearch = this.searchfield.trim();
      if(this.filtertype !=0 || this.filterpoint !=0){
        var ALLproduct = this.productfilter;
      }else{
        var ALLproduct = this.productDict;
      }
      var filter = [];

      for (var i = 0; i < ALLproduct.length; i++){
        if(ALLproduct[i].product.toLowerCase().includes(usersearch.toLowerCase())){
          filter.push(ALLproduct[i])
        }
      }
      this.productfilter=filter;
      this.displayproduct = usersearch;
      return this.productfilter;
    },
    RedeemClick(productpoint,productname,productimg,productcategory){
      this.confirmation(productpoint,productname,productimg,productcategory);
      
    },
    confirmation(productpoint,productname,productimg,productcategory){
      Swal.fire({
       
        title: 'Are you sure want to redeem?',
        text: "You won't be able to revert this!",
        // icon: 'warning',
        imageUrl: productimg,
        imageWidth: 300,
        imageHeight: 400,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, redeem it!',
        width: 'auto',
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.userpoints>=productpoint){
            this.userpoints -= productpoint;
            this.addReward(productname,productimg,productpoint);
            localStorage.setItem("user_points",this.userpoints);
            localStorage.setItem("redeemed",true);
            Swal.fire(
              'REDEEMED!',
              'This product has been redeemed.',
              'success',
              
            )
            window.location.href = "Rewards.html"
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Not enough points!',
            })
          }
        }
      })
    },
    addReward(item_name, img_url, points_used,){
      
      var email = localStorage.getItem('user_email')
      const url = './db/addRewardHistory.php'
      const data = { email: email, item_name: item_name,
                      img_url: img_url, points_used: points_used
                      }
          axios.get(url, {
                  params: data
          })
              .then(response => {
                  console.log(response.data)
              })
              
              .catch(error => {
                  console.log(error);
                  // status = 'There was an error: ' + error.message 
              })
      }
  }
})
const rw = reward.mount('#reward');

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

