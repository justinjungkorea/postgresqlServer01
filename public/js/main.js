var url = 'http://localhost:3700/users';
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.onload = () => {
    var data = request.response;
    var list = document.getElementById('playersList');

    var col = [];
    for(var i=0;i<data.length;i++){
        for(var key in data[i]){
            if(col.indexOf(key) === -1){
                col.push(key);
            }
        }
    }
    col.push("update");
    col.push("delete")


    for(var i=0;i<data.length;i++){
        var _tr = document.createElement('tr');
        list.appendChild(_tr);
        for(var j=0;j<col.length-2;j++){
            var _td = document.createElement('td');
            _td.innerHTML = data[i][col[j]];
            _tr.appendChild(_td);
        }
        var updateBtn = document.createElement('button');
        var deleteBtn = document.createElement('button');
        updateBtn.setAttribute("class","btn btn-info");
        updateBtn.setAttribute("id",`update_${data[i][col[0]]}`);
        updateBtn.innerText = "Update";
        deleteBtn.setAttribute("class","btn btn-danger");
        deleteBtn.setAttribute("id",`delete_${data[i][col[0]]}`);
        deleteBtn.innerText = "Delete";
        _td = document.createElement('td');
        _td.appendChild(updateBtn);
        _tr.appendChild(_td);
        _td = document.createElement('td');
        _td.appendChild(deleteBtn);
        _tr.appendChild(_td);
        
    }
}
request.send();