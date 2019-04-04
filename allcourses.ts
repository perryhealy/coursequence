import { Semester } from "./schedule-app";

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

let math231: Course = new Course(true, true, 4, [], "math231", 1);
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
export let recs: Course[] = [math231, comp110, math232, comp401, math233, math381, math547, comp410, comp411, comp455, stor435, comp550];

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

export let elecs: Course[] = [comp426, comp431, comp433, comp435, comp475, comp520, comp521, comp530, comp541, comp555, comp535, comp581, comp560, comp486, comp562];
export let security: Course[] = [comp431, comp535];
export let ai: Course[] = [comp581, comp560];
export let lowlevel: Course[] = [comp541, comp520, comp530, comp486];
export let mathintensive: Course[] = [comp475, comp562];
export let appdev: Course[] = [comp426, comp433];
export let streams: Course[][] = [security, ai, lowlevel, mathintensive, appdev];
export let firstyr: Course[] = [engl105, lfit, fl1, fl2, fl3];
export let geneds: Course[] = [phys118, astr101, hs, hsss1, hsss2, vp, la, ph, ci, ee, gl, us, na, wb, bn];















