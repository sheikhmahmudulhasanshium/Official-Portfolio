export interface PersonalInterest {
    title: string;
    description: string;
    iconPath: string;
    icon: string;
  }
  
  export interface Pricing {
    icon: string;
    iconLink: string;
    title: string;
    description:  string;
}
export interface Reviews {
  name:string,
  review:string,
  profileIconURL:string,
  designation:string,
  seasonalIdentifier:string,
  reviewerUrl:string,
}


export interface Projects {
  id: string;
  name: string;
  tags: string[];
  LogoUrl: string;
  image: string;
  description: string;
  projectURL: string;
  techStack?: { name: string; logoUrl: string }[]; // Updated to include name and logoUrl for each tech
  subProjects?: SubProject[];
}

export interface SubProject {
name: string;
image?: string;
src: string;
projectURL: string;
techStack?: { name: string; logoUrl: string }[]; // Updated to include name and logoUrl for each tech
}
