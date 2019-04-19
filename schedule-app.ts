import { print, promptNumber } from "introcs";
import { recs, elecs, streams, firstyr, geneds } from "./allcourses";

export class Course {
    credHrs: number;
    prereq: Course[];
    spring: boolean;
    fall: boolean;
    name: string;
    stem: number;
    constructor(spring: boolean, fall: boolean, credHrs: number, prereq: Course[], name: string, stem: number) {
        this.name = name;
        this.spring = spring;
        this.fall = fall;
        this.credHrs = credHrs;
        this.prereq = prereq;
        this.stem = stem;
    }
}

export class Semester {
    spring: boolean;
    fall: boolean;
    num: number;
    credHrs: number = 0;
    prev: Semester | null;
    next: Semester | null;
    stem: number = 0;
    courses: Set<Course> = new Set<Course>();
    constructor(spring: boolean, fall: boolean, num: number, prev?: Semester | null, next?: Semester | null) {
        this.spring = spring;
        this.fall = fall;
        this.num = num;
        if (prev != null) {
            this.prev = prev;
        }
        if (next != null) {
            this.next = next;
        }
    }

    has = (course: Course): boolean => {
        if (this.courses.has(course)) {
            return true;
        } else {
            return false;
        }
    }

    add = (course: Course): boolean => {
        if (this.courses.has(course)) {
            print("Semester" + this.num + " already has " + course.name);
            return false;
        }
        if (course.credHrs + this.credHrs >= 18 || this.stem + course.stem > 3 || !(this.spring && course.spring || this.fall && course.fall)) {
            if (this.next !== null) {
                print("Could not add this semester. Adding to semester " + (this.num + 1));
                return this.next.add(course);
            } else {
                print("Could not add course. Max credits reached or course is not offered.");
                return false;
            }
        } else {
            this.credHrs += course.credHrs;
            this.stem += course.stem;
            this.courses.add(course);
            return true;
        }
    }
}

export let main = async () => {
    // let chosenStream = 0; // replace with button selection
    let chosenStream = await promptNumber("Do you hae an intended focus/stream? Type:" + "\n" + "0 for security" + "\n" + "1 for AI/Robotics" + "\n" + "2 for low-level concepts" + "\n" + "3 for math intensive courses" + "\n" + "4 for app development/web dev" + "\n" + "or 100 for no stream");
    let s1: Semester = new Semester(false, true, 1, null);
    let s2: Semester = new Semester(true, false, 2, s1);
    let s3: Semester = new Semester(false, true, 3, s2);
    let s4: Semester = new Semester(true, false, 4, s3);
    let s5: Semester = new Semester(false, true, 5, s4);
    let s6: Semester = new Semester(true, false, 6, s5);
    let s7: Semester = new Semester(false, true, 7, s6);
    let s8: Semester = new Semester(true, false, 8, s7);
    s1.next = s2; s2.next = s3; s3.next = s4; s4.next = s5; s5.next = s6; s6.next = s7; s7.next = s8; s8.next = null;

    s1 = addCourseList(s1, recs, s1);

    let temp = shuffle(elecs);
    let chosenElecs: Course[] = [];
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


    print("------------");
    printSchedule(s1);

};

export let addCourseList = (curr: Semester | null, courses: Course[], s1: Semester): Semester => {
    for (let i = 0; i < courses.length; i++) {
        curr = s1;
        print("attempting to add " + courses[i].name + "... ");
        while (curr != null) {
            if (checkPrereq(curr, courses[i])) {
                curr.add(courses[i]);
                print("added course " + courses[i].name + " to semester " + curr.num);
                break;
            } else {
                curr = curr.next;
                if (curr != null) {
                    print("checking semester " + curr.num);
                } else {
                    print("checking semester null");
                }
            }
        }
    }
    return s1;
};

export let checkPrereq = (sem: Semester, course: Course): boolean => {
    let found: boolean;
    let curr: Semester | null;
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
};

export let shuffle = (arr: Course[]): Course[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

export let printSchedule = (curr: Semester | null) => {
    while (curr != null) {
        print("Semester " + curr.num);
        curr.courses.forEach(function(c: Course) {
            print("**" + c.name);
        });
        curr = curr.next;
    }
};

main();
