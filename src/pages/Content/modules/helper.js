export const helper = {
  getJobTypeScore: (job) => {
    if (job == 'Fixed-price') {
      return 7;
    } else {
      return 10;
    }
  },
  getClientPaymentStatus: (job) => {
    if (job == 'Payment verified') {
      return 10;
    } else {
      return 0;
    }
  },
  getProposalScore: (proposal) => {
    if (proposal) {
      if (proposal.toLowerCase() == 'less than 5') {
        return 10;
      } else if (proposal.toLowerCase() == '5 to 10') {
        return 8;
      } else if (proposal.toLowerCase() == '10 to 15') {
        return 7;
      } else if (proposal.toLowerCase() == '15 to 20') {
        return 6;
      } else if (proposal.toLowerCase() == '20 to 50') {
        return 4;
      } else if (proposal.toLowerCase() == '50+') {
        return 2;
      } else {
        return 0;
      }
    }
  },
  getClientRating: (rating) => {
    if (rating) {
      return (parseFloat(rating) * 2).toFixed(1);
    } else {
      return 0;
    }
  },
  getClientPaid: (paid) => {
    paid = paid.replace('+', '').replace('$', '');
    if (paid.toString().includes('k')) {
      paid.replace('k', '');
      paid = parseInt(paid);
      paid = paid * 1000;
    }
    if (paid.toString().includes('m')) {
      paid.replace('m', '');
      paid = parseInt(paid);
      paid = paid * 1000000;
    }
    paid = parseInt(paid);
    if (paid == 0) {
      return 0;
    } else if (paid < 100 && paid > 0) {
      return 1;
    } else if (paid > 99 && paid < 500) {
      return 2;
    } else if (paid > 499 && paid < 1000) {
      return 3;
    } else if (paid > 999 && paid < 5000) {
      return 4;
    } else if (paid > 4999 && paid < 10000) {
      return 5;
    } else if (paid > 9999 && paid < 50000) {
      return 6;
    } else if (paid > 49999 && paid < 100000) {
      return 7;
    } else if (paid > 99999 && paid < 500000) {
      return 8;
    } else if (paid > 499999 && paid < 1000000) {
      return 9;
    } else if (paid > 999999) {
      return 10;
    }
  },
  getJobPostingTime: (time) => {
    var timeNum = time.match(/([0-9]+)/g);
    if (timeNum !== null) {
      timeNum = parseInt(timeNum[0]);
      if (time.toString().includes('hour')) {
        timeNum = timeNum * 60 * 60;
      } else if (time.toString().includes('minute')) {
        timeNum = timeNum * 60;
      } else if (time.toString().includes('day')) {
        timeNum = timeNum * 60 * 60 * 24;
      } else if (time.toString().includes('month')) {
        timeNum = timeNum * 60 * 60 * 24 * 30;
      }
      if (timeNum < 3600) {
        return 10;
      } else if (timeNum > 3599 && timeNum < 10800) {
        return 7;
      } else if (timeNum > 10799 && timeNum < 18000) {
        return 5;
      } else if (timeNum > 17999 && timeNum < 86400) {
        return 3;
      } else if (timeNum > 86399) {
        return 0;
      }
    } else {
      return 0;
    }
  },
};
