export type Announcement = {
    id: number;
    text_en: string;
    text_bn: string;
    active: boolean;
};

export type Notice = {
    id: number;
    title_en: string;
    title_bn: string;
    body_en: string | null;
    body_bn: string | null;
    notice_date: string;
};

export type Scholarship = {
    id: number;
    title_en: string;
    title_bn: string;
    body_en: string | null;
    body_bn: string | null;
    announce_date: string;
};

export type ResultItem = {
    id: number;
    title: string;
    class_name: string;
    file_size: number;
    url: string;
    created_at: string;
};

export type GalleryPhoto = {
    id: number;
    caption: string | null;
    url: string;
};

export type Application = {
    id: number;
    student_name: string;
    date_of_birth: string;
    class_name: string;
    gender: string;
    father_name: string;
    mother_name: string;
    phone: string;
    email: string | null;
    previous_school: string | null;
    branch: string;
    address: string;
    created_at: string;
};

export type SitePageProps = {
    announcements: Announcement[];
};

export type AdminStats = {
    notices: number;
    scholarships: number;
    announcements: number;
    activeAnnouncements: number;
    photos: number;
    results: number;
    applications: number;
};
