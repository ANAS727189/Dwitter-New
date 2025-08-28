export {}

declare global {
 interface Window {
    ethereum?: ExternalProvider & {
      isMetaMask?: boolean;
      request?: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export interface Tweet {
  id: number
  author: string
  content: string
  timestamp: number
  likes: number
}

export interface UserProfile {
  displayName: string
  bio: string
}