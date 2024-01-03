export class Income {

    public dateCreated!: Date;

    constructor(public id: number, public amount: number, public year: number, public month: number) {
        this.dateCreated = new Date();
        this.dateCreated.setFullYear(year, month, 7);
    }

}
