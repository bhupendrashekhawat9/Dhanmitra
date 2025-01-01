
declare global {
  interface Document{
    hello: string;
  }
    interface Window {
      SMS: {
        requestPermission(
          successCallback: () => void,
          errorCallback: (error: any) => void
        ): void;
        sendSMS(
          phoneNumber: string,
          message: string,
          successCallback: () => void,
          errorCallback: (error: any) => void
        ): void;
      };
    }
  }
  
  export {};
  