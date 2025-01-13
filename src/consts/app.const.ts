export enum RankGym {
    Beginner,
    Intermediate,
    Advanced,
    Elite,
    Expert,
}

export const rankText = {
    [RankGym.Beginner]: 'Beginner',
    [RankGym.Intermediate]: 'Intermediate',
    [RankGym.Advanced]: 'Advanced',
    [RankGym.Elite]: 'Elite',
    [RankGym.Expert]: 'Expert'
}

export const rankTheme = {
    [RankGym.Beginner]: {
        textColor: '#606060', // Dark Grey
        backgroundColor: '#E8E8E8', // Soft Grey
    },
    [RankGym.Intermediate]: {
        textColor: '#007AFF', // Bright Blue
        backgroundColor: '#D6EEFF', // Pale Blue
    },
    [RankGym.Advanced]: {
        textColor: '#2E7D32', // Forest Green
        backgroundColor: '#DFF5E0', // Pale Green
    },
    [RankGym.Elite]: {
        textColor: '#E2B007', // Goldenrod
        backgroundColor: '#FFF8D6', // Pale Yellow
    },
    [RankGym.Expert]: {
        textColor: '#E74C3C', // Bright Red
        backgroundColor: '#FFE2DE', // Light Peach
    },
}

export enum Gender {
    Male,
    Female,
}

export const GenderText = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female'
}