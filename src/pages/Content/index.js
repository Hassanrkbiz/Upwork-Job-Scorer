import { Arrive } from './modules/arrive';
import { helper } from './modules/helper';


console.log('content script running');

document.arrive(
  '[data-test="job-tile-list"] > section.up-card-section',
  function (elem) {
    console.log('elem created');
    MainFunc([elem]);
  }
);

function MainFunc(jobCards) {
  if (jobCards.length > 0) {
    jobCards.forEach((card, index) => {
      var exist = card.querySelectorAll(".upworkjobscoreext");
      if (exist.length < 1) {
        var TotalJobScore = 0;
        var count = 0;
        var jobType = card.querySelectorAll('strong[data-test="job-type"]');
        if (jobType.length > 0) {
          var JobTypeScore = helper.getJobTypeScore(jobType[0].innerText);
          // console.log(JobTypeScore);
          TotalJobScore += parseFloat(JobTypeScore);
          count += 1;
        }
        var clientPaymentStatus = card.querySelectorAll(
          'strong[class="text-muted"]'
        );
        if (clientPaymentStatus.length > 0) {
          var PaymentStatusScore = helper.getClientPaymentStatus(
            clientPaymentStatus[0].innerText
          );
          // console.log(PaymentStatusScore);
          TotalJobScore += parseFloat(PaymentStatusScore);
          count += 1;
        }
        var clientPaid = card.querySelectorAll(
          '[data-test="client-spendings"] > strong'
        );
        if (clientPaid.length > 0) {
          var ClientPaidScore = helper.getClientPaid(clientPaid[0].innerText);
          // console.log(ClientPaidScore);
          TotalJobScore += parseFloat(ClientPaidScore);
          count += 1;
        }
        var clientRating = card.querySelectorAll(
          ".up-rating-background > span"
        );
        if (clientRating.length > 0) {
          var ClientRatingScore = helper.getClientRating(
            clientRating[0].innerText
              .replace("Rating is ", "")
              .replace(" out of 5.", "")
          );
          // console.log(ClientRatingScore);
          TotalJobScore += parseFloat(ClientRatingScore);
          count += 1;
        }
        var JobPostingTime = card.querySelectorAll('[data-test="posted-on"]');
        if (JobPostingTime.length > 0) {
          var JobPostingScore = helper.getJobPostingTime(
            JobPostingTime[0].innerText
          );
          // console.log(JobPostingScore);
          TotalJobScore += parseFloat(JobPostingScore);
          count += 1;
        }
        // console.log(TotalJobScore);
        TotalJobScore = (TotalJobScore / count).toFixed(1);
        if (TotalJobScore > 6.9 && TotalJobScore < 10.1) {
          createJobBadge("greenJobSE", card, TotalJobScore);
        } else if (TotalJobScore > 2.9 && TotalJobScore < 7) {
          createJobBadge("yellowJobSE", card, TotalJobScore);
        } else if (TotalJobScore > -0.1 && TotalJobScore < 3) {
          createJobBadge("redJobSE", card, TotalJobScore);
        }
      }
    });
  }
}

function createJobBadge(classN, card, score) {
  var div = document.createElement("div");
  div.className = "upworkjobscoreext";
  div.innerHTML = `<h2 class="${classN}">${score}</h2>`;
  card.appendChild(div);
}
