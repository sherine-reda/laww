// [
//     {"question":{
//         "id":"1",//🙈
//         "answers":[
//             {
//                 "id":"1A",//🙈
//                 "name": "اجابة السؤال الاول ",//🙈
//                 "price": 0,
//                 "type": "select", //🙈
//                 "input_name": "q1",//🙈
//                 "options":[
//                 "id":"O1",//🙈
//                 "name":"option1"//🙈
//                  ]

//             }
//         ]
//     }}
// ]
export const DataApi = [
  {
    question: {
      id: 1,
      name: "السؤال  الاول",
      description: "وصف سؤال الخدمة بالانجليزية",
      answers: [
        {
          id: "1A", //🙈
          name: "اجابة السؤال الاول ",
          description: "وصف اجابة السؤال بالانجليزية",
          price: 0,
          type: "select", //🙈
          input_name: "q1", //🙈
          options: [
            {
              id: "3O",
              name: "لغه الانجليزيه",
              answer_id: 1,
            },
            {
              id: "4O",
              name: "لفه العربيه",
              answer_id: 1,
            },
           
          ],
        },
      ],
    },
  },
  {
    question: {
      id: 2,
      name: "السؤال الثاني ",
      description: "وصف سؤال الخدمة الهنديه",
      answers: [
        {
          id: "2A",
          name: "اجابة السؤال الثاني",
          description: "وصف اجابة السؤال الهنديه",
        //   price: 500,
          type: "text",
          input_name: "q2",
          options: [],
        },
      ],
    },
  },
  {
    question: {
      id: 3,
      name: "السؤال الثالث ",
      description: "وصف سؤال الخدمة الفرنسيه",
      answers: [
        {
          id: "3A",
          name: "اجابة السؤال الثالث",
          description: "وصف اجابة السؤال الفرنسيه",
        //   price: 500,
          type: "number",
          input_name: "q3",
          options: [],
        },
      ],
    },
  },
  {
    question: {
      id: 4,
      name: " سؤال الرابع",
      description: "وصف سؤال الخدمة بالانجليزية 2",
      answers: [
        {
          id: "4A",
          name: "male",
          description: "",
          price: 0,
          type: "radio",
          input_name: "Gender",
          options: [],
        },
        {
          id: "5A",
          name: "Female",
          description: "",
          price: 0,
          type: "radio",
          input_name: "Gender",
          options: [],
        },
      ],
    },
  },
  {
    question: {
      id: 5,
      name: "السؤال الخامس",
      description: "contry",
      answers: [
        {
          id: "6A",
          name: "Choose country",
          description: "Choose country",
          price: 0,
          type: "select",
          input_name: "country",
          options: [
            {
              id: "1O",
              name: "egypt",
              answer_id: 27,
            },
            {
              id: "2O",
              name: "palestine",
              answer_id: 27,
            },
          ],
        },
      ],
    },
  },
  {
    question: {
      id: 6,
      name: "السؤال السادس",
      description: "choose desc",
      answers: [
        {
          id: "7A",
          name: "front",
          description: "end",
          price: 31,
          type: "checkbox",
          input_name: "Special",
          options: [],
        },
        {
          id: "8A",
          name: "back",
          description: "back",
          price: 15,
          type: "checkbox",
          input_name: "Special",
          options: [],
        },
      ],
    },
  },
];

		
