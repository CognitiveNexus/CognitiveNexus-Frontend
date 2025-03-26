export default class PromiseTask {
    private pendingTask: {
        task: () => Promise<void>;
        resolve: (value: any) => void;
        reject: (reason: any) => void;
    } | null = null;
    private processingLock = Promise.resolve();

    add<T>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            if (this.pendingTask) {
                this.pendingTask.reject(new Error('Task canceled'));
            }

            const wrappedTask = {
                task: () => task().then(resolve, reject),
                resolve,
                reject,
            };

            this.pendingTask = wrappedTask;
            this.processingLock = this.processingLock.then(() => this.process());
        });
    }

    private async process(): Promise<void> {
        if (!this.pendingTask) return;

        const currentTask = this.pendingTask;
        this.pendingTask = null;

        try {
            await currentTask.task();
        } catch (error) {}
    }
}
