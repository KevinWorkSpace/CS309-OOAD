function onClickAddFlight()
{
    let licensePlate = document.querySelector('form input[name="licensePlate-­‐no"]').value;
    let entranceNumber = document.querySelector('form select[id="entrance--no"]').value;
    let year = document.querySelector('form select[id="year"]').value;
    let month = document.querySelector('form select[id="month"]').value;
    let day = document.querySelector('form select[id="day"]').value;
    let ahour = document.querySelector('form select[id="ahour"]').value;
    let aminute = document.querySelector('form select[id="aminute"]').value;
    let dhour = document.querySelector('form select[id="dhour"]').value;
    let dminute = document.querySelector('form select[id="dminute"]').value;
    let staffName = document.querySelector('form input[name="staffName"]').value;
    let staffNumber = document.querySelector('form input[name="staffNumber"]').value;
    let status = document.querySelector('form input[name="status"]').value;
    if (validateInput(licensePlate, entranceNumber, year, month, day, ahour, aminute, dhour, dminute, staffName, staffNumber, status))
    {
        // alert("Success!");
        addRow();
    }
}

function validateInput(licensePlate, entranceNumber, year, month, day, ahour, aminute, dhour, dminute, staffName, staffNumber, status)
{
    let LicenseRegex1 = new RegExp(/^[A-Z0-9]{5}$/);
    let LicenseRegex2 = new RegExp(/^[DF]{1}[A-Z0-9]{5}$/);
    let entranceNoRegex = new RegExp(/^[0-9]{1}$/);
    let yearRegex = new RegExp(/^[0-9]{4}$/);
    let monthRegex = new RegExp(/^[0-9]{1,2}/);
    let dayRegex = new RegExp(/^[0-9]{1,2}$/);
    let timeRegex = new RegExp(/^[0-9]{1,2}$/);
    // let staffNameRegex = new RegExp();
    let staffNoRegex = new RegExp(/^[35][0-9]{7}$/);
    // if(licensePlate==null||licensePlate.replace(/^\s+,""/).replace(/^\s+$/,"")=='')
    // {
    //     alert("Invalid license plate code");
    //     return false;
    // }
    if (!(LicenseRegex1.test(licensePlate) || LicenseRegex2.test(licensePlate)))
    {
        alert("Invalid license plate code");
        return false;
    }
    if (!entranceNoRegex.test(entranceNumber))
    {
        alert("Invalid entrance number code.");
        return false;
    }
    if (!yearRegex.test(year))
    {
        alert("Invalid year code");
        return false;
    }
    if (!monthRegex.test(month))
    {
        alert("Invalid month code");
        return false;
    }
    if (!dayRegex.test(day))
    {
        alert("Invalid day code");
        return false;
    }
    if(!timeRegex.test(ahour))
    {
        alert("Invalid arrival hour code");
        return false;
    }
    if(!timeRegex.test(aminute))
    {
        alert("Invalid arrival minute code");
        return false;
    }
    if(staffName==null||staffName.replace(/^\s+,""/).replace(/^\s+$/,"")=='')
    {
        alert("Invalid staff name code");
        return false;
    }
    if(!staffNoRegex.test(staffNumber))
    {
        alert("Invalid staff number code");
        return false;
    }
    var mytable = document.getElementById("mytable");
    for(var i=1,rows=mytable.rows.length; i<rows; i++)
    {
        if ("粤B" + licensePlate == mytable.rows[i].cells[0].innerHTML) //License Plate Number
        {
            alert("duplicate license plate code");
            return false;
        }
        if (year + "." + month + "." + day == mytable.rows[i].cells[2].innerHTML) //Date
        {
            alert("duplicate date code");
            return false;
        }
        if (pad(ahour) + ":" + pad(aminute) == mytable.rows[i].cells[3].innerHTML) //Arrival Time
        {
            alert("duplicate arrival time code");
            return false;
        }
    }
    if( (parseInt(dhour) < parseInt(ahour)) || ((parseInt(dhour) === parseInt(ahour)) && (parseInt(dminute) < parseInt(aminute)) ))
    {
        alert("the departure time should be after the arrival time");
        return false;
    }
    var radioVal = 0;
    var radio = document.getElementsByName("status");
    for (i=0; i<radio.length; i++) {
        if (radio[i].checked) {
            radioVal = radio[i].value;
        }
    }
    if (radioVal == 0) {
        alert("Invalid status code");
        return false;
    }
    if (radioVal == "1" && (timeRegex.test(dhour) || timeRegex.test(dminute)))
    {
        alert("there is not departure time when the status is in");
        return false;
    }
    if(radioVal == "2" && (!timeRegex.test(dhour)))
    {
        alert("Invalid departure hour code");
        return false;
    }
    if(radioVal == "2" && (!timeRegex.test(dminute)))
    {
        alert("Invalid departure minute code");
        return false;
    }
    return true;
}

function initial()
{
    var myForm = document.getElementById("dd");
    myForm.style.visibility="hidden";
    let entranceNo = document.getElementById("entrance--no");
    entranceNo.innerHTML = "";
    entranceNo.options.add(new Option("--", null));
    for (let i = 1; i <= 7; i++)
    {
        entranceNo.options.add(new Option(i, i));
    }
    let year = document.getElementById("year");
    year.innerHTML = "";
    year.options.add(new Option("--", null));
    for (let i = 2000; i <= 2020; i++)
    {
        year.options.add(new Option(i, i));
    }
    let dh = document.getElementById("dhour");
    dh.innerHTML = "";
    dh.options.add(new Option("--", null));
    for (let i = 0; i <= 23; i++)
    {
        dh.options.add(new Option(i, i));
    }
    let dm = document.getElementById("dminute");
    dm.innerHTML = "";
    dm.options.add(new Option("--", null));
    for (let i = 0; i <= 59; i++)
    {
        dm.options.add(new Option(i, i));
    }
    let ah = document.getElementById("ahour");
    ah.innerHTML = "";
    ah.options.add(new Option("--", null));
    for (let i = 0; i <= 23; i++)
    {
        ah.options.add(new Option(i, i));
    }
    let am = document.getElementById("aminute");
    am.innerHTML = "";
    am.options.add(new Option("--", null));
    for (let i = 0; i <= 59; i++)
    {
        am.options.add(new Option(i, i));
    }
    let status = document.getElementById("status");
    status.innerHTML = "";
    status.options.add(new Option("--", null));
    status.options.add(new Option("In", "In"));
    status.options.add(new Option("Out", "Out"));
}

function setMonth()
{
    let month = document.getElementById("month");
    month.innerHTML = "";
    month.options.add(new Option("--", null));
    for (let i = 1; i <= 12; i++)
    {
        month.options.add(new Option(i, i));
    }
}
function setDay()
{
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day");
    let data = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
//clear the items
    day.innerHTML = "";
//add new items
    day.options.add(new Option("--", null));
    for (let i = 1; i <= data[month - 1]; i++)
    {
        day.options.add(new Option(i, i));
    }
    if (((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) && month == 2)
    {
        day.options.add(new Option(29, 29));
    }
}

function addRow()
{
    let bodyObj = document.getElementById("tbody");
    if (bodyObj === null)
    {
        alert("Body of Table not Exist!");
        return;
    }
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let dhour = pad(document.getElementById("dhour").value);
    let dminute = pad(document.getElementById("dminute").value);
    let ahour = pad(document.getElementById("ahour").value);
    let aminute = pad(document.getElementById("aminute").value);
    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; //display the tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = "粤B" + document.forms[0]["licensePlate-­‐no"].value;
    newRow.insertCell(1).innerHTML = document.forms[0]["entrance--no"].value;
    newRow.insertCell(2).innerHTML = year + "." + month + "." + day;
    newRow.insertCell(3).innerHTML = ahour + ":" + aminute;
    if ((dhour + ":" + dminute) != "null:null")
    {
        newRow.insertCell(4).innerHTML = dhour + ":" + dminute;
    }
    else
    {
        newRow.insertCell(4).innerHTML = "--";
    }
    newRow.insertCell(5).innerHTML = document.forms[0]["staffName"].value;
    newRow.insertCell(6).innerHTML = document.forms[0]["staffNumber"].value;
    newRow.insertCell(7).innerHTML = document.forms[0].status.value;
    newRow.insertCell(8).innerHTML = bodyObj.rows[0].cells[cellCount - 1].innerHTML; //copy the "delete" button
    bodyObj.rows[0].style.display = "none"; //hide first row
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function removeRow(inputobj)
{
    if (inputobj == null)
        return;
    let parentTD = inputobj.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}

function show(){
    var myForm= document.getElementById("dd");
    myForm.style.visibility="visible";
    myForm.style.display = "";
}

function hidden2(){
    var myForm = document.getElementById("dd");
    myForm.style.visibility="hidden";
}