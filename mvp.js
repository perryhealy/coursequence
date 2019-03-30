class Course {
    constructor(spring, fall, credHrs, prereq, name) {
        this.name = name;
        this.spring = spring;
        this.fall = fall;
        this.credHrs = credHrs;
        this.prereq = prereq;
    }
}

class Semester {
    constructor(spring, fall, num, prev, next) {
        this.spring = spring;
        this.fall = fall;
        this.num = num;
        this.courses = new Set();
        this.credHrs = 0;
        if (prev != null) {
            this.prev = prev;
        }
        if (next != null) {
            this.next = next;
        }

        this.has = (course) => {
            if (this.courses.has(course)) {
                return true;
            } else {
                return false;
            }
        };
    
        this.add = (course) => {
            if (this.courses.has(course)) {
                // print("Semester" + this.num + " already has " + course.name);
                return false;
            }
            if (course.credHrs + this.credHrs >= 18 || !(this.spring && course.spring || this.fall && course.fall)) {
                if (this.next !== null) {
                    // print("Could not add this semester. Adding to semester " + (this.num + 1));
                    return this.next.add(course);
                } else {
                    // print("Could not add course. Max credits reached or course is not offered.");
                    return false;
                }
            } else {
                this.credHrs += course.credHrs;
                this.courses.add(course);
                return true;
            }
        };
    }


}

class FinalSemesters {
    constructor(num, courses) {
        this.num = num;
        this.courses = pls(courses);
        
    }
}

class Major {
    constructor(name, code, tracks) {
        this.name = name;
        this.code = code;
        this.tracks = tracks;
    }
}

class Track {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}

let math231 = new Course(true, true, 4, [], "math231");
let math232 = new Course(true, true, 4, [math231], "math232");
let math233 = new Course(true, true, 4, [math231, math232], "math233");
let math381 = new Course(true, true, 3, [math231, math232], "math381");
let math547 = new Course(true, true, 3, [math233], "math547");
let stor435 = new Course(true, true, 3, [math233], "stor435");
let comp110 = new Course(true, true, 3, [math231], "comp110");
let comp401 = new Course(true, true, 4, [comp110], "comp401");
let comp410 = new Course(true, true, 3, [comp401], "comp410");
let comp411 = new Course(true, true, 4, [comp401], "comp411");
let comp455 = new Course(true, true, 3, [comp110, comp401, math381], "comp455");
let comp550 = new Course(true, true, 3, [comp401, comp410, math381], "comp550");
let recs = [math231, comp110, math232, comp401, math233, math381, math547, comp410, comp411, comp455, stor435, comp550];

let comp426 = new Course(true, true, 3, [comp401, comp410], "comp426");
let comp431 = new Course(true, true, 3, [comp401, comp410, comp411], "comp431");
let comp433 = new Course(true, true, 3, [comp401, comp410, comp411], "comp433");
let comp435 = new Course(true, true, 3, [comp401, comp410, comp411], "comp435");
let comp475 = new Course(true, true, 3, [comp401, comp410, comp411, math547], "comp475");
let comp520 = new Course(true, false, 3, [comp401, comp410, comp411, comp455], "comp520");
let comp521 = new Course(true, true, 3, [comp401, comp410, comp411], "comp521");
let comp530 = new Course(false, true, 3, [comp401, comp410, comp411], "comp530");
let comp541 = new Course(true, false, 4, [comp401, comp411], "comp541");
let comp555 = new Course(true, false, 3, [comp401, comp410, math231], "comp555");
let elecs = [comp426, comp431, comp433, comp435, comp475, comp520, comp521, comp530, comp541, comp555];

$(document).ready(function () {
    $("#start").click(function() {
        $("#schedule").empty();
        generate_schedule();
    });

    let ml = set_majors();
    provide_specifics(ml);

    $("#major").change(function() {
        provide_specifics(ml);
    });
});

let generate_schedule = () => {
    let schedule = $("#con");
    schedule.empty();
    let semesters = form_schedule($("sems").val());
    
    while (semesters != null) {
        let s = "<table><th>Semester " + semesters.num + "</th>";
        for (let c of semesters.courses.values()) {
            s += "<tr><td>" + c.name + "</td></tr>";
        }
        s += "</table>";
        schedule.append(s);
        semesters = semesters.next;
    }
}

let form_schedule = (remaining) => {
    let s1 = new Semester(false, true, 1, null);
    let s2 = new Semester(true, false, 2, s1);
    let s3 = new Semester(false, true, 3, s2);
    let s4 = new Semester(true, false, 4, s3);
    let s5 = new Semester(false, true, 5, s4);
    let s6 = new Semester(true, false, 6, s5);
    let s7 = new Semester(false, true, 7, s6);
    let s8 = new Semester(true, false, 8, s7);
    s1.next = s2; s2.next = s3; s3.next = s4; s4.next = s5; s5.next = s6; s6.next = s7; s7.next = s8; s8.next = null;

    s1 = addCourseList(s1, recs, s1);

    let temp = shuffle(elecs);
    let chosenElecs = [];
    for (let i = 0; i < 5; i++) {
        chosenElecs[chosenElecs.length] = temp[i];
    }

    s1 = addCourseList(s1, chosenElecs, s1);
    
    return s1;
}

let set_majors = () => {
    let cs = new Major("Computer Science", "cs", [new Track("Systems", "sys"), new Track("Front End", "front"), new Track("Math-Heavy", "math"), new Track("Security", "sec")]);
    let total = [cs];
    let major_field = $("#major");
    for (let i = 0; i < total.length; i++) {
        major_field.append("<option value='" + total[i].code + "'>" + total[i].name + "</option>");
    }
    return total;
}

let provide_specifics = (major_list) => {
    let major_field = $("#major");
    let major = major_field.val();
    let specs = $("#specifics");
    specs.empty();
        for (let i = 0; i < major_list.length; i++) {
            if (major_list[i].code == major) {
                for (let j = 0; j < major_list[i].tracks.length; j++) {
                    specs.append("<input id='" + major_list[i].tracks[j].code + "' type='checkbox'>" + major_list[i].tracks[j].name + "<br>");
                }
            }
        }
}

let addCourseList = (curr, courses, s1) => {
    for (let i = 0; i < courses.length; i++) {
        curr = s1;
        while (curr != null) {
            if (checkPrereq(curr, courses[i])) {
                curr.add(courses[i]);
                break;
            } else {
                curr = curr.next;
            }
        }
    }
    return s1;
}

let checkPrereq = (sem, course) => {
    let found = false;
    let curr = null;
    if (sem.num < 2 && course.prereq.length > 0) { return false; }
    for (let i = 0; i < course.prereq.length; i++) {
        curr = sem.prev;
        found = false;
        while (curr != null) {
            if (curr.courses.has(course.prereq[i])) {
                found = true;
                break;
            } else {
                curr = curr.prev;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

let shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

let pls = (courses) => {
    let res = [];
    courses.forEach(function(c) {
        res[res.length] = c;
    });
    return res;
};