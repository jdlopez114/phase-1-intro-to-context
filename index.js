// Your code here
const createEmployeeRecord = function (recordArray) {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


const createEmployeeRecords = (arr) => {
    return arr.map(rec => createEmployeeRecord(rec));
}


const createTimeInEvent = function (empObj, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    const obj = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    }
    empObj.timeInEvents.push(obj);
    return empObj;
}


const createTimeOutEvent = function (empObj, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    const obj = {
        type: "TimeOut",
        hour: parseInt(hour, 10), // 2nd arugument is base 10 is default 
        date: date,
    }
    empObj.timeOutEvents.push(obj); /// van use this.timeOutEvents.ppush
    return empObj;
}

const hoursWorkedOnDate = function (empObj, targetDate){
    // let hours;
    //     for (let i = 0; i < Object.keys(empObj).length; i++){
    //         if (empObj.timeInEvents[i].date === date){
    //             if (empObj.timeOutEvents[i].date === date){
    //                 hours = empObj.timeOutEvents[i].hour - empObj.timeInEvents[i].hour;
    //          }
    //     }
        
    // }
    // console.log(hours/100);
    // if (date === Object.values(empObj.timeOutEvents.date)){
    //     return (Object.values(empObj.timeOutEvents.hour) - Object.values(empObj.timeInEvents.hour)) / 100;
    // }
    const inEvent = empObj.timeInEvents.find(inEvent => inEvent.date === targetDate);
    const outEvent = empObj.timeOutEvents.find(outEvent => outEvent.date === targetDate);
    return (outEvent.hour - inEvent.hour) / 100;
}


const wagesEarnedOnDate = function (empObj, targetDate){
    return hoursWorkedOnDate(empObj, targetDate) * empObj.payPerHour; 
}

const allWagesFor = function(empObj){
    const wageDates = empObj.timeInEvents.map(function (e){
        return e.date;
    })

    const payable = wageDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(empObj, d)
    }, 0);

    return payable;
}

const calculatePayroll = function (arrayOfEmployees){
    return arrayOfEmployees.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}