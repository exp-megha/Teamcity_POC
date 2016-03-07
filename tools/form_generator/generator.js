var ECT = require('ect');
var fs = require('fs');
var path = require("path");
var changeCase = require('change-case');
var YAML = require('yamljs');

//==================================START FUNCTIONS DEFINITIONS =====================================================================//
// for seting the buttons details

var setButtons = function(buttons) {
        var newButtons = [];
        for (var j = 0; j < buttons.length; j++) {

            // for seting ng click in button
            if (buttons[j].type == 'button' && buttons[j].hasOwnProperty('onChange')) {

                var events = 'ng-click="' + changeCase.camelCase(buttons[j].onChange) + '"';


            } else if (buttons[j].type == 'button' && buttons[j].hasOwnProperty('onClick')) {

                var events = 'ng-click="' + changeCase.camelCase(buttons[j].onClick) + '"';


            } else if (buttons[j].type == 'reset') {

                var events = 'ng-click="' + changeCase.camelCase('onReset') + '"';

            } else {

                var events = ""
            }
            if(buttons[j].type == "reset"){
               var type = 'button';
            }else{
                var type = buttons[j].type;
            }

            newButtons[j] = {
                type: type,
                value: changeCase.upperCaseFirst(buttons[j].value),
                events: events

            }

        }

        return newButtons;

    }
    //split the url into the key value pair

var splitUrl = function(url) {
        var restAngularUrl = [];
        var splitUrl = url.split("/");
        var index = 0;

        var totalArray =  Math.ceil(splitUrl.length / 2);
        for (var i = 0; i < totalArray; i++) {

            var urlElement = [];

            for (var j = 0; j < 2; j++) {
                if(index < splitUrl.length ){
                  urlElement[j] = splitUrl[index];   
                }else{
                   urlElement[j] =""; 
                }
                
                index++;


            }
            
            if (urlElement[1]) {
                var urlValue = ", "+ urlElement[1].replace(/[^a-zA-Z ]/g, "");
                var newNode={
                           key: urlElement[0],
                           value: urlValue
                  };
            } else {
                var newNode={
                           key: urlElement[0],
                           
                  };
            }

            restAngularUrl[i] = newNode;

        };
        
        return restAngularUrl;

    }
    // find the fields in a specific block

var fieldsInBlock = function(blockId, fields) {
    var blockFields = [];
    var index = 0;
    for (var j = 0; j < fields.length; j++) {

        if (blockId == fields[j].blockId) {

            if (fields[j].hasOwnProperty('onChange')) {

                var events = 'ng-change="' + changeCase.camelCase(fields[j].onChange) + '()"';;


            } else if (fields[j].hasOwnProperty('onClick')) {

                var events = 'ng-click="' + changeCase.camelCase(fields[j].onClick) + '()"';


            } else {
                var events = "";
            }

            //

            if (fields[j].hasOwnProperty('validate')) {
                var validate = 'validation="' + fields[j].validate + '"';
            } else {
                var validate = "";
            }


            blockFields[index] = {
                label: changeCase.titleCase(fields[j].label),
                type: fields[j].type,
                name: changeCase.camelCase(fields[j].name),
                blockId: fields[j].blockId,
                placeholder: fields[j].placeholder,
                help: fields[j].help,
                validate: validate,
                events: events
            }
            index++;
        }

    }

    return blockFields;
};

// for finds the events in the data

var groupEvent = function(fields, buttons) {

    var index = 0;
    var events = [];
    for (var j = 0; j < fields.length; j++) {


        if (fields[j].hasOwnProperty('onChange')) {

            events[index] = changeCase.camelCase(fields[j].onChange);
            index++;

        } else if (fields[j].hasOwnProperty('onClick')) {

            events[index] = changeCase.camelCase(fields[j].onClick);
            index++;

        } else {

        }


    }

    for (var j = 0; j < buttons.length; j++) {


        if (buttons[j].type == 'button' && buttons[j].hasOwnProperty('onChange')) {

            events[index] = changeCase.camelCase(buttons[j].onChange);
            index++;

        } else if (buttons[j].type == 'button' && buttons[j].hasOwnProperty('onClick')) {

            events[index] = changeCase.camelCase(buttons[j].onClick);
            index++;

        } else if (buttons[j].type == 'reset') {

            events[index] = changeCase.camelCase('onReset');
            index++;
        } else {

        }


    }
    return events
}

// covert struture of yaml object.

var tplDataCreator = function(data) {


    var blocks = data.blocks;
    var fields = data.fields;
    var buttons = data.buttons;


    var tplData = {};
    tplData.blocks = [];
    tplData.formTitle = changeCase.titleCase(data.formName);
    tplData.formName = data.formName;
    tplData.templateType = data.templateType;
    tplData.formalFormName = changeCase.pascalCase(data.formName);
    tplData.errorMessage = data.errorMessage;
    tplData.successMessage = data.successMessage;
    tplData.module = data.module;
    tplData.controllerAs = changeCase.camelCase(data.controllerAs);

    // check submitUrl node exit in the data
    if (data.hasOwnProperty('submitUrl')) {

        var restAngularUrl = splitUrl(data.submitUrl); //split the url into the key value pair

        tplData.submitUrl = {
            status: 1,
            restAngularUrl: restAngularUrl
        };

    } else {

        tplData.submitUrl = {
            status: 0
        };
    }

    // check nextUrl node exit in the data
    if (data.hasOwnProperty('nextUrl')) {

        tplData.nextUrl = {
            status: 1,
            url: data.nextUrl
        };

    } else {

        tplData.nextUrl = {
            status: 0
        };
    }

    // check initUrl node exit in the data
    if (data.hasOwnProperty('initUrl')) {

        var restAngularUrl = splitUrl(data.initUrl); //split the url into the key value pair

        tplData.initUrl = {
            status: 1,
            restAngularUrl: restAngularUrl
        };

    } else {

        tplData.initUrl = {
            status: 0
        };
    }


    for (var i = 0; i < blocks.length; i++) { // looping through the blocks

        var blockId = blocks[i].blockId;
        var title = changeCase.titleCase(blocks[i].title);
        var blockType = blocks[i].blockType;
        var blockFields = fieldsInBlock(blockId, fields); // for grouping the fields in a block

        // for calculating the total rows in a block
        var totalRow = blockFields.length / blockType;
        totalRow = Math.ceil(totalRow);
        var totalFields = blockFields.length;

        var fieldIndex = 0;
        var rowDiv = [];
        // looping the rows
        for (var r = 0; r < totalRow; r++) {

            var colField = [];

            // for adding columns in a row
            for (var c = 0; c < blockType; c++) {

                if (fieldIndex < totalFields) {

                    colField[c] = blockFields[fieldIndex];
                    fieldIndex++;

                } else {

                    break;
                }


            }

            rowDiv[r] = {
                fields: colField
            };

        }

        var blockRows = JSON.stringify(rowDiv);
        // create template data
        tplData.blocks[i] = {
            blockId: blockId,
            blockType: blockType,
            title: title,
            rows: JSON.parse(blockRows)
        };

    }
    // for grouping the events in to a node 'events' 
    tplData.events = groupEvent(fields, buttons);
    tplData.buttons = setButtons(buttons);
    //console.log(tplData);
    return tplData;

};

//generate template
var generateTemplate = function(directoryPath, tplName, extension, data, newFileName) {

    var renderer = ECT({
        root: directoryPath,
        ext: extension
    });
    renderer.render(tplName, data, function(error, html) {

        saveFile(newFileName, html);

    });
};

//save templates
var saveFile = function(path, content) {
    fs.writeFile(path, content, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("- The file was created successfully ! (PATH : " + path + " )");
        }
    });
};

//==================================END FUNCTIONS DEFINITIONS =====================================================================//


//================================== START INPUT READING AND PROCESSING CODE =====================================================================//

// read YAML file name from terminal or cmd window

var yamlFileName = process.argv[2];
var data = YAML.load(yamlFileName); //fs.readFileSync(file).toString();
var jsonData = JSON.parse(JSON.stringify(data, null, "    "));

var tplData = tplDataCreator(jsonData);
var dataConfig = fs.readFileSync(__dirname + '/config.json').toString();
var config = JSON.parse(dataConfig);
var tpl = config.templatePaths;


// for finding template source dirctory.

for (var i = 0; i < tpl.length; i++) {

    if (tpl[i].tplName == tplData.templateType) { // for identifying the required template type

        var tplFolder = tpl[i].tplFolder;

    }
}

// read base templates

var directoryPath = __dirname + '/' + tplFolder;
var files = fs.readdirSync(directoryPath);

if (files) {

    // create a directory for output
    var directory = __dirname + '/tpl/' + tplData.formName;

    if (!fs.existsSync(directory)) { // check folder exist or not
        fs.mkdir(directory, '777', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }




    // loop through files      
    files.forEach(function(file) {

        var fileName = file.replace("name", tplData.formalFormName);
        var newFileName = directory + "/" + fileName;
        generateTemplate(directoryPath, file, path.extname(file), tplData, newFileName);
    });

} else {

    console.log("Error in YAML data");
}
//================================== END INPUT READING AND PROCESSING CODE =====================================================================//