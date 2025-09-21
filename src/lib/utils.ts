export function calculateRideDuration(fromPincode: string, toPincode: string): number {
    const fromNum = parseInt(fromPincode) || 0;
    const toNum = parseInt(toPincode) || 0;
    return Math.abs(toNum - fromNum) % 24;
  }
  
  export function calculateEndTime(startTime: Date, durationHours: number): Date {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + durationHours);
    return endTime;
  }