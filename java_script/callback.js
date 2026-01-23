function studentDetails(name, marks, studentResult){

    let totalMark = 0
    let totalSubject = 0
    console.log("student name = ", name)
        for (const data in marks) {
            console.log(`${data} : ${marks[data]}`)
            totalMark += marks[data]
            totalSubject += 1
        }
    console.log("\nstudent result is publishing... \nplease wait 3 seconds")
    
    setTimeout(()=>{
        const result = studentResult(totalMark,totalSubject)
        console.log(`\nResult : ${result}`)
    },3000)

}
const studentResult = (tm,ts)=>{
    return tm/ts
}

studentDetails(
    "meet chauhan",
    {
        english:45,
        maths:78,
        coding:99
    },
    studentResult
)
