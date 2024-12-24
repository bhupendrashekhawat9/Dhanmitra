interface Goals{
    id: number;
    name : string;
    goalAmount:number;
    createdDate: Date;
    targetDate:Date;
    reason:String;
}
interface AddGoalPayloadType{
    name : string;
    goalAmount:number;
    targetDate:Date;
    reason:String;
    userId:number
    createdDate: Date;

}
