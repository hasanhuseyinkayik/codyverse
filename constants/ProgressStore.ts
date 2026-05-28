type Status = 'completed' | 'current' | 'locked';

class ModuleProgressStore {
  private progress: Record<number, Status> = {
    1: 'current',
  };

  getProgress(): Record<number, Status> {
    // Yeni obje döndür, React değişikliği algılasın
    return { ...this.progress };
  }

  completeModule(id: number, totalModules: number) {
    this.progress = { ...this.progress, [id]: 'completed' };
    if (id + 1 <= totalModules) {
      this.progress = { ...this.progress, [id + 1]: 'current' };
    }
  }
}

export const moduleProgressStore = new ModuleProgressStore();