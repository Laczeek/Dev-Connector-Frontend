export interface IUser {
	_id: string;
	name: string;
	email: string;
	avatar: string;
}

export interface IProfile {
	_id: string;
	user: {
		name: string;
		_id: string;
		avatar: string;
	};
	company?: string;
	website?: string;
	location?: string;
	status: string;
	skills: string[];
	bio?: string;
	githubusername?: string;
	experience?: {
		_id: string;
		title: string;
		company: string;
		location?: string;
		from: Date;
		to?: Date;
		current: boolean;
		description?: string;
	}[];
	education?: {
		_id: string;
		school: string;
		degree: string;
		fieldofstudy: string;
		from: Date;
		to?: Date;
		current: boolean;
		description?: string;
	}[];
	social?: { youtube?: string; twitter?: string; facebook?: string; linkedin?: string; instagram?: string };
	createdAt: Date;
}

export type IProfileShort = Pick<IProfile, '_id' | 'user' | 'skills' | 'company' | 'location' | 'status'>;

export type IProfileState = Required<
	Omit<IProfile, 'user' | 'createdAt' | 'skills' | 'social' | 'experience' | 'education' | '_id'> & {
		skills: string;
		youtube: string;
		twitter: string;
		facebook: string;
		linkedin: string;
		instagram: string;
	}
>;

export type IProfileSocial = {
	youtube?: string;
	twitter?: string;
	facebook?: string;
	linkedin?: string;
	instagram?: string;
};

export interface IEducationState {
	school: string;
	degree: string;
	fieldofstudy: string;
	from: string;
	to: string;
	current: boolean;
	description: string;
}

export interface IExperienceState {
	title: string;
	company: string;
	location: string;
	from: string;
	to: string;
	current: boolean;
	description: string;
}

export interface IExperience {
	_id: string;
	title: string;
	company: string;
	location?: string;
	from: Date;
	to?: Date;
	current: boolean;
	description?: string;
}

export interface IEducation {
	_id: string;
	school: string;
	degree: string;
	fieldofstudy: string;
	from: Date;
	to?: Date;
	current: boolean;
	description?: string;
}

export interface IComment {
	_id:string;
	user: string;
	name: string;
	avatar: string;
	text: string;
	createdAt: Date;
}

export interface IPost {
	_id:string;
	user: string;
	text:string;
	name: string;
	avatar:string;
	likes: string[] | [];
	comments: IComment[] | [];
	createdAt: Date; 
}