export interface YogaPose {
  keys: string[]; // Used for matching spoken words, e.g., ["downward dog", "down dog"]
  displayName: string; // Formatted name for display, e.g., "Downward-Facing Dog"
  imageName: string; // Unique identifier for picsum.photos seed or specific image file
}

export enum ListeningState {
  IDLE = "IDLE",
  LISTENING = "LISTENING",
  PROCESSING = "PROCESSING",
  ERROR = "ERROR",
}