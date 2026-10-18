export const CLASSES = Array.from(
    { length: 12 },
    (_, index) => `Class ${index + 1}`,
);

export const BRANCHES = ['Bhairab Bazar Branch', 'Kamalpur Branch'] as const;

export const GENDERS = ['Male', 'Female'] as const;

export function formatSize(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function classLabel(className: string, isBangla: boolean): string {
    return isBangla ? className.replace('Class', 'শ্রেণি') : className;
}

export function branchLabel(branch: string, isBangla: boolean): string {
    if (!isBangla) {
        return branch;
    }

    return branch === 'Bhairab Bazar Branch' ? 'ভৈরব বাজার শাখা' : 'কমলপুর শাখা';
}

export function genderLabel(gender: string, isBangla: boolean): string {
    if (!isBangla) {
        return gender;
    }

    return gender === 'Male' ? 'ছেলে' : 'মেয়ে';
}

export function formatDate(value: string, isBangla: boolean): string {
    return new Date(value).toLocaleDateString(isBangla ? 'bn-BD' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
