
interface TaskInterface {
    id: number;
    title: string;
    start_day: number;
    start_time: string;
    end_day: number;
    end_time: string;
}

const week_days = ['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday'];

export class Task implements TaskInterface{
    public constructor(
        public _title: string,
        public start_day: number,
        public start_time: string,
        public end_day: number,
        private _end_time: string,
    ){
        this.title = _title;
        this.start_day = start_day;
        this.start_time = start_time;
        this.end_day = end_day;
        this.end_time= _end_time;
        }
        public id = Date.now();
        public parent_id: number  = 0;
        public start_date: number = this.setDate(this.start_day, this.start_time);
        public end_date: number = this.setDate(this.end_day, this.end_time);
        public duration: number = this.setDuration();
        public start_day_name: string = week_days[this.start_day-1];
        public end_day_name: string = week_days[this.end_day-1];
        public children: Task[] = [];
        public original_end_day: number = this.end_day;
        public original_end_time: string = this.end_time;

        public get title(){
            return this._title;
        };

        public set title(str: string){
            this._title = str;
        };
        
        public get end_time(){
            return this._end_time;
        }
        public set end_time(time: string) {
            this._end_time = time;
        };

        setDate(day: number, time: string): number{
            return day*10000 + parseInt(time.slice(0,2).concat(time.slice(-2)))
        }

        setDuration(): number{
            if (this.start_day === this.end_day && this.end_time < this.start_time) return 7
            else if (this.start_day > this.end_day) return 7 + (this.end_day - this.start_day);
            else return this.end_day - this.start_day;
        }

        setChildrenTask2(): Task[] {
            const childArr: Task[] = [];

            let child_start_day: number = 0;
            let child_start_time: string = '';
            let child_end_day: number = 0;
            let child_end_time: string = '';
            for (let i=1; i <= this.duration; i++){
                
                child_start_day = this.start_day + i;
                if (child_start_day > 7) child_start_day-=7;
                child_start_time = '00:00';

                if (child_start_day === this.end_day) {
                    child_end_day = this.end_day;
                    child_end_time = this.end_time
                }
                else {
                    child_end_day = child_start_day;
                    child_end_time = '23:59'
                }

                let childTask = new Task (this.title, child_start_day, child_start_time, child_end_day, child_end_time);
                childTask.id = this.id+i;
                childTask.parent_id = this.id;
                childArr.push(childTask);
            }
            return childArr;
        }

        printTask(){
            if(!this.parent_id){
                console.log(
                    'TITLE: ' + this.title + ' ID: ' + this.id + '\n'
                    + 'START: ' + this.start_day + " " + this.start_time + '\n'
                    + 'END: ' + this.end_day + " " + this.end_time + '\n'
                    + 'Duration: ' + this.duration + '\n'
                    + 'Childrens: '  + this.children.length
                )
            }
            if(this.parent_id){
                console.log(
                    'TITLE: ' + this.title + ' ID: ' + this.id + '\n'
                    + 'START: ' + this.start_day + " " + this.start_time + '\n'
                    + 'END: ' + this.end_day + " " + this.end_time + '\n'
                    + 'Duration: ' + this.duration + '\n'
                    + 'Child Nº: '  + (this.id - this.parent_id)
                );
            }
            if (this.children.length > 0 ){
                console.log('--- CHILDREDN --- ')
                for (let child of this.children){
                    child.printTask();
                }
            }
        }
}