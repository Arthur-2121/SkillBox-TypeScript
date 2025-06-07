enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

type Todo = {
    todo: string;
    priority: Priority;
};

type User = {
    name: string;
    status: Status;
    todos: Todo[];

    changeStatus(newStatus: Status): void;
    addTodo(todo: string, priority?: Priority): void;
    displayTodos(): void;
    displayActiveTodos(): void;
};

const user: User = {
    name: '',
    status: Status.ACTIVE,
    todos: [],

    changeStatus(newStatus: Status): void {
        this.status = newStatus;
        console.log(`User status changed to ${newStatus}`);
    },

    addTodo(todo: string, priority: Priority = Priority.MEDIUM): void {
        this.todos.push({ todo, priority });
        console.log(`Todo added: ${todo} (Priority: ${priority})`);
    },

    displayTodos(): void {
        console.log(`Todos for ${this.name}:`);
        this.todos.forEach((item) => {
            console.log(`${item.todo} (Priority: ${item.priority})`);
        });
    },

    displayActiveTodos(): void {
        console.log(`Active Todos for ${this.name}:`);
        this.todos
            .filter((item) => item.priority !== Priority.HIGH)
            .forEach((item) => {
                console.log(`${item.todo} (Priority: ${item.priority})`);
            });
    },
};

user.name = 'John';
user.changeStatus(Status.ACTIVE);
user.addTodo('take delivery', Priority.HIGH);
user.addTodo('stocktaking', Priority.HIGH);
user.addTodo('collect the order');
user.addTodo('throw out the trash', Priority.LOW);
user.displayTodos();
user.displayActiveTodos();
user.changeStatus(Status.INACTIVE);