export class WorkTimer {
  private timerId: number | null = null;
  private startTime: number | null = null;
  private currentInterval: number;

  constructor(
    private onComplete: () => void,
    intervalMinutes: number = 20
  ) {
    this.currentInterval = intervalMinutes;
  }

  start() {
    if (this.timerId) return;

    this.startTime = Date.now();
    this.timerId = window.setInterval(() => {
      if (!this.startTime) return;

      const elapsed = (Date.now() - this.startTime) / (1000 * 60);
      if (elapsed >= this.currentInterval) {
        this.onComplete();
        this.stop();
      }
    }, 1000);
  }

  stop() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
      this.startTime = null;
    }
  }

  setInterval(minutes: number) {
    this.currentInterval = minutes;
    if (this.isRunning()) {
      this.stop();
      this.start();
    }
  }

  isRunning() {
    return this.timerId !== null;
  }

  getTimeLeft(): number {
    if (!this.startTime) return this.currentInterval;
    const elapsed = (Date.now() - this.startTime) / (1000 * 60);
    return Math.max(0, this.currentInterval - elapsed);
  }
}