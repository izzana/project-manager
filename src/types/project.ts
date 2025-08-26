export interface ICreateProject {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
};

export interface ProjectData {
  id?: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
};
