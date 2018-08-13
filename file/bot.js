var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setOptions({
    fontFamily: "",
    fontSize: "40pt"
  });
editor.session.setMode("ace/mode/javascript");
//--------시작
var openfilelink = "";

const fs = require('fs');
var app = require('electron').remote; 
var dialog = app.dialog;
var {dialog} = require('electron').remote;


editor.commands.addCommand({
    name: 'newfile',
    bindKey: {win: "Ctrl-N", "mac": "Cmd-N"},
    exec: function(editor) {


        let content = "";

        dialog.showSaveDialog((fileName) => {
        if (fileName === undefined){
            return;
        }

    
        fs.writeFile(fileName, content, (err) => {
            if(err){
               return 0; 
            }
                    
            openfilelink = fileName;

        });
    });
    }
});

editor.commands.addCommand({
    name: 'openfile',
    bindKey: {win: "Ctrl-O", "mac": "Cmd-O"},
    exec: function(editor) {
        dialog.showOpenDialog((fileNames) => {
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
                return;
            }
        
            fs.readFile(fileNames[0], 'utf-8', (err, data) => { 
                if(err){
                    return;
                }
                if(fileNames[0].match(".js")){
                    editor.session.setMode("ace/mode/javascript"); 
                }
                else if(fileNames[0].match(".py")){
                    editor.session.setMode("ace/mode/python");
                }
                else if(fileNames[0].match(".c")){
                    editor.session.setMode("ace/mode/c");
                }
                else if(fileNames[0].match(".css")){
                    editor.session.setMode("ace/mode/css");
                }
                else if(fileNames[0].match(".html")){
                    editor.session.setMode("ace/mode/html");
                }
                else{
                    editor.session.setMode("ace/mode/text");
                }
                openfilelink = fileNames[0];
                editor.setValue(data);
            });
        });
         
        
        // Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
        // And obviously , loop through the fileNames and read every file manually

    }
});
editor.commands.addCommand({
    name: 'savefile',
    bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
    exec: function(editor) {
        fs.writeFile(openfilelink, content, (err) => {
            if (err) {
                document.getElementsByClassName("close")[0].onclick = function() {
                    document.getElementById('myModal').style.display = "none";
                }
                return;
            }
        
            alert("The file has been succesfully saved");
        });
       
    }
});
