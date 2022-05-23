console.log('from js file');
function loadData(){
    console.log("start")
  fetch('books.json') //path to the file with json data
          .then(response => {
              return response.json();
          })
          .then(data => {
            console.log(data);
            data.forEach((item, index) => document.querySelector('.info').append(addBook(item,index)));
            
            
            //    listOfAuthors(data);
           //   listOfBooks(data);
          });
         
          //console.log('output')
  }
  
  function listOfAuthors(data){
    let htmlCode = "";
    data.forEach((value, index) => {
                console.log(value.author);
                htmlCode += value.author + "<br/>"
                //console.log(htmlCode)
              });
               document.getElementById("author_list").innerHTML = htmlCode;
  }

  loadData();
