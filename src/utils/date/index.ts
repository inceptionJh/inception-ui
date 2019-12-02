export default {
  generateDateList: (start: Date, end: Date, period: "year" | "month" | "day") => {
    const dateList = [] as Date[];
    switch (period) {
      case "year": {
        for (const date = start; date.getTime() <= end.getTime();) {
          const year = date.getFullYear();
          dateList.push(new Date(`${year}`));
          date.setFullYear(date.getFullYear() + 1);
        }
        return dateList;
      }

      case "month": {
        for (const date = start; date.getTime() <= end.getTime();) {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          dateList.push(new Date(`${year}-${month >= 10 ? month : `0${month}`}`));
          date.setMonth(date.getMonth() + 1);
        }
        return dateList;
      }

      case "day": {
        for (const date = start; date.getTime() <= end.getTime();) {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          dateList.push(new Date(`${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`));
          date.setDate(date.getDate() + 1);
        }
        return dateList;
      }
    }
  },
};
