export interface ToDoItem {
    id: number;
    text: string;
    done: boolean;
}

export class HttpClient {
    private readonly baseUrl: string = "http://localhost:3000";
    private readonly todoGeneralUrl: string = `${this.baseUrl}/todos`;

    public async getAllToDoItems(): Promise<ToDoItem[]> {
        return <ToDoItem[]>await $.get(this.todoGeneralUrl);
    }

    public addNewItem(text: string, success: () => void): void {
        const data = {
            text: text,
            done: false
        };

        $.ajax({
            url: this.todoGeneralUrl,
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            success: _ => success()
        });
    }

    public updateItem(id :number, success: ()=> void): void{
        const data = {
            done: true
        };

        $.ajax({
            url: `${this.todoGeneralUrl}/${id}`,
            data: JSON.stringify(data),
            type: 'PATCH',
            contentType: 'application/json',
            processData: false,
            success: _ => success()
        });
    }
}