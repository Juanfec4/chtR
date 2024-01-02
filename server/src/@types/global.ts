export type Messages = {
  error: {
    [key: string]: string;
  };
  success: {
    [key: string]: string;
    CREATED: "Created successfully.";
  };
};
