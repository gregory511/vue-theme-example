import type { Task } from "@/types/task";

export const tasks: Task[] = [
    {
        name: "Cours 1",
        done: true,
        tasks: [
            {
                name: "Présentation",
                done: true
            },
            {
                name: "Création des groupes projet",
                done: true
            },
            {
                name: "Tailwind - infos générales",
                done: true
            },
            {
                name: "Brainstorming projets",
                done: true,
            },
            {
                name: "Système OKLCH",
                done: true
            },
            {
                name: "Variables",
                done: true
            }
        ]
    },
    {
        name: "Cours 2 - Matin",
        done: false,
        tasks: [
            {
                name: "Thèmes et dark mode",
                done: true
            },
            {
                name: "Responsive Design",
                done: false
            }
        ]
    },
    {
        name: "Cours 2 - Après-midi",
        done: false,
        tasks: [
            {
                name: "Vue et réactivité",
                done: false
            },
            {
                name: "Performance et sécurité",
                done: false
            }
        ]
    }
];