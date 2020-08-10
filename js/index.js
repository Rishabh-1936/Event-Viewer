var lorIps='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia animi labore totam fugit cupiditate tenetur ea illum perferendis neque eos at, aut quis sunt quibusdam dolorem laborum voluptate voluptates? Aspernatur.'
var json_obj=
{
    '1':{'name':'Event 1',
        'timestamp':'1039872020',
        '_raw':lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps+lorIps
    },
    '2':{'name':'Event 2',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '3':{'name':'Event 3',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '4':{'name':'Event 4',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '5':{'name':'Event 5',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '6':{'name':'Event 6',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '7':{'name':'Event 7',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '8':{'name':'Event 8',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '9':{'name':'Event 9',
        'timestamp':'1039872020',
        '_raw':lorIps
    },
    '10':{'name':'Event 10',
        'timestamp':'1039872020',
        '_raw':lorIps
    }
}

function vertical_tablink_func(id,name){
    return `<button class="vertical-tablinks ${id}" onclick="openEvent(event, '${id}','vertical')">${name}</button>`
}

function content_div_func(id){  
    let ele=json_obj[id];
    return `
        <div id="${id}" class="tabcontent" name="${id}">
            <h3>Event : ${ele['name']}</h3>
            <p>timestamp : ${ele['timestamp']}</p>
            <p>_raw : ${ele['_raw']}</p>
        </div>
    `
}

function horizontal_tablink_func(id,name){
    return `
    <li class="horizontal-tablink-container ${id}" name="${id}">
        <button class="horizontal-tablink" onclick="openEvent(event, '${id}','horizontal')">${name}</button>
        <div class="close" onclick="close_tab(event)">&times;</div>
    </li>` 
}

window.onload=function(){
    
    let vertical_tab_div=document.getElementsByClassName('vertical-tab')[0]; //it contains the vertical div
    let content_div=document.getElementsByClassName('content')[0]; //it contains the content div
    
    let tab_html=``,content_html=``;

    Object.keys(json_obj).forEach((key)=>{

        console.log(key,json_obj[key]['name'])
        tab_html+=vertical_tablink_func(key,json_obj[key]['name']);
        content_html+=content_div_func(key); 
    })

       vertical_tab_div.innerHTML = tab_html;
       content_div.innerHTML = content_html;
}

function close_tab(e){
    clear_content(e.currentTarget.parentNode.attributes[1].value);//clears the content of tab
    //e.currentTarget.parentNode.attributes[1].value == name 
    
    console.log(e.currentTarget.parentNode.remove())// remove the tab
}

function clear_content(name){
    
    let tabs_content=document.getElementsByClassName('tabcontent');
    let tabs=document.getElementsByClassName('horizontal-tablink-container');


    for(let i=0;i<tabs.length;++i){
        if(tabs[i].attributes[1].value == name){
            
            let cur_ele=document.getElementById(name);

            if(cur_ele.style.display=="none"){
                // if the tab exists in the open tab list
                break;
            }
            else if(cur_ele.style.display=="block" && i!=0){
                // its content is visible but it is not the first tab
                // then open the previous tab
                openEvent(null,tabs[i-1].attributes[1].value)
                break;
            }
            else if(cur_ele.style.display=="block" && i==0){
                //if the content is visible and it is the first tab then we have nothing to display after that so make its display none
                cur_ele.style.display="none";
                break;
            }
        }
    }

}


function check_for_existing(id){
    let tabs = document.getElementsByClassName("horizontal-tablink-container"); // contain the reference of the tabs in the horizontal bar

    for(let i=0;i<tabs.length;++i){
        if(tabs[i].attributes[1].value==id){
            clear_content(tabs[i].attributes[1].value); // to clear the content of pervious open tab
            tabs[i].remove(); // to delete the tab
            return true;
        }
    }
    return false; // if tab is not found it means it is clicked for the first time
}


function openEvent(event,id,dir="horizontal"){

    let tabcontent = document.getElementsByClassName("tabcontent"); // all content divs
    let vertical_tablinks = document.getElementsByClassName("vertical-tablinks"); //vertical tab links
    let horizontal_tablinks = document.getElementsByClassName("horizontal-tablink-container"); // horizontal tab links container
    let top_bar=document.getElementsByClassName('top-bar')[0];


    if(dir=="vertical"){
        check_for_existing(id); // it will remove the existing tab of the same id and open it in fresh tab. 
    }

      for (i = 0; i < tabcontent.length; i++) {
          //to make the display of every content block none
        tabcontent[i].style.display = "none";
      }
      
      for (i = 0; i < vertical_tablinks.length; i++) {
          //remove the active class  from vertical tabs
        vertical_tablinks[i].classList.remove("active");
      }
      for (i = 0; i < horizontal_tablinks.length; i++) {
        //remove the active class from the horizontal tabs
        horizontal_tablinks[i].classList.remove("active");
      }
      // setting the display of the clicked tab's content is 'block'
      document.getElementById(id).style.display = "block";

      if(dir=="vertical"){
          //adding the reference of the clicked event at the horizontal bar i.e top bar
        top_bar.innerHTML+=horizontal_tablink_func(id,json_obj[id]['name']);
      }

      let active_list=document.getElementsByClassName(id); // contains the list of those div which are active i.e display to the user
      // So we get the reference of both the horizontal and vertical tab


      for(i=0;i<active_list.length;++i){
          // now adding the active class to them.
          active_list[i].classList.add("active")
      }
}
