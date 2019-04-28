class Course {
    constructor(spring, fall, credHrs, prereq, name, stem) {
        this.name = name;
        this.spring = spring;
        this.fall = fall;
        this.credHrs = credHrs;
        this.prereq = prereq;
        this.stem = stem;
    }
}

class Semester {
    constructor(spring, fall, num, prev, next) {
        this.spring = spring;
        this.fall = fall;
        this.num = num;
        this.courses = new Set();
        this.credHrs = 0;
        this.stem = 0;
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
            if (course.credHrs + this.credHrs >= 18 || this.stem + course.stem > 3 || !(this.spring && course.spring || this.fall && course.fall)) {
                if (this.next !== null) {
                    // print("Could not add this semester. Adding to semester " + (this.num + 1));
                    return this.next.add(course);
                } else {
                    // print("Could not add course. Max credits reached or course is not offered.");
                    return false;
                }
            } else {
                this.credHrs += course.credHrs;
                this.stem += course.stem;
                this.courses.add(course);
                return true;
            }
        };
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
    // Analytics
    gtag('event', "Generate", {
        'event_category': "Schedule"
    });

    let schedule = $("#con");
    schedule.empty();
    let semesters = form_schedule($("#sems").val());
    
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
    let chosenStream = $("#specifics").val();
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
    if (chosenStream < 10) {
        for (let i = 0; i < 5; i++) {
            if (i < streams[chosenStream].length) {
                chosenElecs[chosenElecs.length] = streams[chosenStream][i];
            } else {
                chosenElecs[chosenElecs.length] = temp[i - chosenElecs.length];
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            chosenElecs[chosenElecs.length] = temp[i];
        }
    }

    let temp2 = shuffle(geneds);

    s1 = addCourseList(s1, chosenElecs, s1);
    s1 = addCourseList(s1, firstyr, s1);
    s1 = addCourseList(s1, temp2, s1);
    
    return s1;
}

let set_majors = () => {
    let cs = new Major("Computer Science", "cs", [new Track("Security", "sec"), new Track("AI", "ai"), new Track("Systems", "sys"), new Track("Math-Intensive", "math"), new Track("App Development", "app")]);
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
                    specs.append("<option value='" + j + "'>" + major_list[i].tracks[j].name + "</option>");
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


// Course Data:

let math231 = new Course(true, true, 4, [], "math231", 1);
let math232 = new Course(true, true, 4, [math231], "math232", 1);
let math233 = new Course(true, true, 4, [math231, math232], "math233", 1);
let math381 = new Course(true, true, 3, [math231, math232], "math381", 1);
let math547 = new Course(true, true, 3, [math233], "math547", 1);
let stor435 = new Course(true, true, 3, [math233], "stor435", 1);
let comp110 = new Course(true, true, 3, [math231], "comp110", 1);
let comp401 = new Course(true, true, 4, [comp110], "comp401", 1);
let comp410 = new Course(true, true, 3, [comp401], "comp410", 1);
let comp411 = new Course(true, true, 4, [comp401], "comp411", 1);
let comp455 = new Course(true, true, 3, [comp110, comp401, math381], "comp455", 1);
let comp550 = new Course(true, true, 3, [comp401, comp410, math381], "comp550", 1);
let recs = [math231, comp110, math232, comp401, math233, math381, math547, comp410, comp411, comp455, stor435, comp550];

let comp426 = new Course(true, true, 3, [comp401, comp410], "comp426", 1);
let comp431 = new Course(true, true, 3, [comp401, comp410, comp411], "comp431", 1);
let comp433 = new Course(true, true, 3, [comp401, comp410, comp411], "comp433", 1);
let comp435 = new Course(true, true, 3, [comp401, comp410, comp411], "comp435", 1);
let comp475 = new Course(true, true, 3, [comp401, comp410, comp411, math547], "comp475", 1);
let comp520 = new Course(true, false, 3, [comp401, comp410, comp411, comp455], "comp520", 1);
let comp521 = new Course(true, true, 3, [comp401, comp410, comp411], "comp521", 1);
let comp530 = new Course(false, true, 3, [comp401, comp410, comp411], "comp530", 1);
let comp541 = new Course(true, false, 4, [comp401, comp411], "comp541", 1);
let comp555 = new Course(true, false, 3, [comp401, comp410, math231], "comp555", 1);
let comp535 = new Course(true, false, 3, [comp401, comp410, math231, comp550], "comp535", 1);
let comp581 = new Course(true, true, 3, [comp401, comp410], "comp581", 1);
let comp560 = new Course(false, true, 3, [comp401, comp410, math231], "comp560", 1);
let comp486 = new Course(true, false, 3, [comp110, comp410], "comp486", 1);
let comp562 = new Course(true, true, 3, [comp401, comp410, math233, stor435], "comp562", 1);

let engl105 = new Course(true, true, 3, [], "engl105", 0);
let lfit = new Course(true, true, 1, [], "lfit", 0);

let fl1 = new Course(false, true, 3, [], "foreign language 1", 0);
let fl2 = new Course(true, false, 3, [fl1], "foreign language 2", 0);
let fl3 = new Course(false, true, 3, [fl1, fl2], "foreign language 3", 0);
let phys118 = new Course(true, true, 4, [math231], "phys118", 1);
let astr101 = new Course(true, true, 4, [], "additional stem + lab", 1);
let hs = new Course(true, true, 3, [], "HS", 0);
let hsss1 = new Course(true, true, 3, [], "SS/HS", 0);
let hsss2 = new Course(true, true, 3, [], "SS/HS", 0);
let vp = new Course(true, true, 3, [], "VP", 0);
let la = new Course(true, true, 3, [], "LA", 0);
let ph = new Course(true, true, 3, [], "PH", 0);
let ci = new Course(true, true, 3, [], "CI", 0);
let ee = new Course(true, true, 3, [], "EE", 0);
let gl = new Course(true, true, 3, [], "GL", 0);
let us = new Course(true, true, 3, [], "US", 0);
let na = new Course(true, true, 3, [], "NA", 0);
let wb = new Course(true, true, 3, [], "WB", 0);
let bn = new Course(true, true, 3, [], "BN", 0);

let elecs = [comp426, comp431, comp433, comp435, comp475, comp520, comp521, comp530, comp541, comp555, comp535, comp581, comp560, comp486, comp562];
let security = [comp431, comp535];
let ai = [comp581, comp560];
let lowlevel = [comp541, comp520, comp530, comp486];
let mathintensive = [comp475, comp562];
let appdev = [comp426, comp433];
let streams = [security, ai, lowlevel, mathintensive, appdev];
let firstyr = [engl105, lfit, fl1, fl2, fl3];
let geneds = [phys118, astr101, hs, hsss1, hsss2, vp, la, ph, ci, ee, gl, us, na, wb, bn];