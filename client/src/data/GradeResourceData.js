const gradeResources = [
  {
    grade: "Nursery",
    subjects: [
      {
        name: "Math",
        lessons: [
          {
            title: "Counting 1 to 10",
            type: "video",
            url: "https://www.youtube.com/watch?v=DR-cfDsHCGA",
            description: "Learn to count from 1 to 10 with fun animations.",
          },
        ],
      },
      {
        name: "English",
        lessons: [
          {
            title: "Alphabet Song",
            type: "video",
            url: "https://www.youtube.com/watch?v=75p-N9YKqNo",
            description: "Sing along to learn the alphabet.",
          },
        ],
      },
    ],
  },
  {
    grade: "Grade 1",
    subjects: [
      {
        name: "Math",
        lessons: [
          {
            title: "Addition Basics",
            type: "pdf",
            url: "https://example.com/addition-basics.pdf",
            description: "Printable worksheet on basic addition.",
          },
        ],
      },
      {
        name: "Science",
        lessons: [
          {
            title: "Plant Parts",
            type: "link",
            url: "https://example.com/plant-parts",
            description: "Interactive page about plant parts and functions.",
          },
        ],
      },
    ],
  },
];

export default gradeResources;
