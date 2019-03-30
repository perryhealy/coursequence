import { Semester } from "./schedule-app";

export class Course {
    credHrs: number;
    prereq: Course[];
    spring: boolean;
    fall: boolean;
    name: string;
    constructor(spring: boolean, fall: boolean, credHrs: number, prereq: Course[], name: string) {
        this.name = name;
        this.spring = spring;
        this.fall = fall;
        this.credHrs = credHrs;
        this.prereq = prereq;
    }
}

let math231: Course = new Course(true, true, 4, [], "math231");
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
export let recs: Course[] = [math231, comp110, math232, comp401, math233, math381, math547, comp410, comp411, comp455, stor435, comp550];

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
export let elecs: Course[] = [comp426, comp431, comp433, comp435, comp475, comp520, comp521, comp530, comp541, comp555];










