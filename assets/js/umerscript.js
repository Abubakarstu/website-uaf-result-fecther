response_p = document.getElementById("response")
result_table = document.getElementById("result_table")
submit = document.getElementById("submit")
agNumber = document.getElementById("ag")


submit.addEventListener("click",()=>{
    document.getElementById("loading").style.visibility = "visible"
    document.getElementById("container").style.filter = "blur(10px)"
    var tables = document.getElementsByTagName("TABLE");
    for (var i=tables.length-1; i>=0;i-=1)
        if (tables[i]) tables[i].parentNode.removeChild(tables[i]);
    ag = agNumber.value
    var request = new Request('https://lms-result-app.herokuapp.com/semester/'+ag);
    fetch(request).then(function(response) {
        return response.json()
    }).then(function(response) {
        setResult(response)
    });
    
});

function setResult(response){
    const details_table = document.createElement('table')
    details_table.classList.add("result_table")
    detail_row_t = details_table.insertRow(0)
    detail_row_t.insertCell(0).outerHTML = "<th>Name</th>" 
    detail_row_t.insertCell(1).outerHTML = "<th>Ag#</th>" 
    detail_row_t.insertCell(2).outerHTML = "<th>CGPA</th>" 

    detail_row_d = details_table.insertRow(1)
    detail_row_d.insertCell(0).innerHTML = response["details"]["name"]
    detail_row_d.insertCell(1).innerHTML = response["details"]["ag"]
    detail_row_d.insertCell(2).innerHTML = response["details"]["cgpa"]
    
    document.getElementById("table-container").appendChild(details_table)
    var count = Object.keys(response).length;
    for(var semester in response){
        if(semester != "details"){
        var res_table = document.createElement('table');
        detai_row = res_table.insertRow(0)
        semester_c = detai_row.insertCell(0).outerHTML = "<th>Semester</th>"
        gpa_c = detai_row.insertCell(1).outerHTML = "<th>GPA</th>"
        semester_c.colSpan = "5"
        gpa_c.colSpan = "5"
        detai_row_d = res_table.insertRow(1)
        detai_row_d.insertCell(0).innerHTML = semester
        detai_row_d.insertCell(1).innerHTML = response[semester]["gpa"]
        title_row = res_table.insertRow(2)
        title_row.insertCell(0).outerHTML = "<th>Teacher</th>" 
        title_row.insertCell(1).outerHTML = "<th>Course Code</th>" 
        title_row.insertCell(2).outerHTML = "<th>Course Title</th>" 
        title_row.insertCell(3).outerHTML = "<th>Credit Hrs</th>" 
        title_row.insertCell(4).outerHTML = "<th>Mid</th>" 
        title_row.insertCell(5).outerHTML = "<th>Assignment</th>" 
        title_row.insertCell(6).outerHTML = "<th>Final</th>" 
        title_row.insertCell(7).outerHTML = "<th>Practical</th>" 
        title_row.insertCell(8).outerHTML = "<th>Total</th>" 
        title_row.insertCell(9).outerHTML = "<th>Grade</th>" 
        res_table.classList.add("result_table")
        semester_res = response[semester]
        sub_per_sem = Object.keys(semester_res).length - 1;
            for(var sub_res in semester_res){
                if(sub_res != "gpa"){
                    row = res_table.insertRow(parseInt(sub_res)+3)
                    teacher_c = row.insertCell(0)
                    course_code_c = row.insertCell(1)
                    course_title_c = row.insertCell(2)
                    credit_c = row.insertCell(3)
                    mid_c = row.insertCell(4)
                    assignment_c = row.insertCell(5)
                    final_c = row.insertCell(6)
                    practical_c = row.insertCell(7)
                    total_c = row.insertCell(8)
                    grade_c = row.insertCell(9)
                    teacher_c.innerHTML = response[semester][sub_res]["teacher_name"]
                    course_code_c.innerHTML = response[semester][sub_res]["course_code"]
                    course_title_c.innerHTML = response[semester][sub_res]["course_title"]
                    credit_c.innerHTML = response[semester][sub_res]["credit_hrs"]
                    mid_c.innerHTML = response[semester][sub_res]["mid"]
                    assignment_c.innerHTML = response[semester][sub_res]["assignment"]
                    final_c.innerHTML = response[semester][sub_res]["final"]
                    practical_c.innerHTML = response[semester][sub_res]["practical"]
                    total_c.innerHTML = response[semester][sub_res]["total_marks"]
                    grade_c.innerHTML = response[semester][sub_res]["grade"]
                }else{
                    rows_count = res_table.rows.length
                    row = res_table.insertRow(rows_count)

                }
            }
        }
    document.getElementById("table-container").appendChild(res_table)
    }
    document.getElementById("loading").style.visibility = "collapse"
    document.getElementById("container").style.filter = "blur(0px)"
}