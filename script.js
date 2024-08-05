let normalConfirmCount = 0;
let noCount = 0;

function selectMood(mood) {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    switch(mood) {
        case 'Normal':
            document.body.style.backgroundColor = 'white';
            normalConfirmCount = 0;
            question.textContent = 'Are you sure you are feeling normal?';
            options.innerHTML = '<button onclick="confirmNormal()">Yes</button>';
            break;
        case 'Angry':
            document.body.style.backgroundColor = 'red';
            question.textContent = 'Why are you angry?';
            options.innerHTML = `
                <button onclick="followUp('angry', 'family')">Due to Family</button>
                <button onclick="followUp('angry', 'boyfriend')">Due to Boyfriend</button>
                <button onclick="followUp('angry', 'friends')">Due to Friends</button>
                <button onclick="followUp('angry', 'god')">Due to God</button>`;
            break;
        case 'Sad':
            document.body.style.backgroundColor = 'grey';
            question.textContent = 'Why are you sad?';
            options.innerHTML = `
                <button onclick="followUp('sad', 'family')">Due to Family</button>
                <button onclick="followUp('sad', 'boyfriend')">Due to Boyfriend</button>
                <button onclick="followUp('sad', 'friends')">Due to Friends</button>
                <button onclick="followUp('sad', 'god')">Due to God</button>`;
            break;
        case 'Loving':
            document.body.style.backgroundColor = 'pink';
            question.textContent = 'Aww, that’s sweet! Who are you feeling loving towards?';
            options.innerHTML = `
                <button onclick="followUp('loving', 'family')">Family</button>
                <button onclick="followUp('loving', 'boyfriend')">Boyfriend</button>
                <button onclick="followUp('loving', 'friends')">Friends</button>
                <button onclick="followUp('loving', 'god')">God</button>`;
            break;
        case 'Killer-Mode':
            document.body.style.backgroundColor = 'darkred';
            question.textContent = 'Uh-oh, who or what is making you feel like this?';
            options.innerHTML = `
                <button onclick="followUp('killer', 'family')">Family</button>
                <button onclick="followUp('killer', 'boyfriend')">Boyfriend</button>
                <button onclick="followUp('killer', 'friends')">Friends</button>
                <button onclick="followUp('killer', 'god')">Due to God</button>`;
            break;
    }
}

function confirmNormal() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    normalConfirmCount++;
    if (normalConfirmCount === 1) {
        question.textContent = 'Are you absolutely sure you are feeling normal?';
    } else if (normalConfirmCount === 2) {
        question.textContent = 'Really? Not hiding anything?';
    } else {
        question.textContent = 'Okay, glad you are feeling normal!';
        options.innerHTML = '<button onclick="showAdvice(\'normal\')">Get Advice</button>';
        return;
    }
    options.innerHTML = '<button onclick="confirmNormal()">Yes</button>';
}

function followUp(mood, reason) {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    if ((mood === 'angry' && reason === 'boyfriend') || (mood === 'sad' && reason === 'boyfriend')) {
        noCount = 0;
        endlessSorryLoop();
    } else {
        if (mood === 'loving' && reason === 'boyfriend') {
            lovingForBoyfriend();
        } else {
            let advice = getAdvice(mood, reason);
            question.textContent = `You are ${mood} because of ${reason}. ${advice}`;
            options.innerHTML = '<button onclick="tellJoke()">Tell me a joke</button>';
        }
    }
}

function endlessSorryLoop() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    noCount++;
    let apologyMessage = getApologyMessage(noCount);
    question.innerHTML = apologyMessage;

    if (noCount >= 10) {
        options.innerHTML = '<button onclick="endWithApology()">End Apology</button>';
    } else {
        options.innerHTML = `
            <button onclick="forgiveMe()">Forgiven</button>
            <button onclick="endlessSorryLoop()">NO</button>`;
    }
}

function getApologyMessage(count) {
    const messages = [
        "I am sorry! Please forgive me.",
        "I apologize deeply. Can you forgive me?",
        "I regret my actions. Please forgive me.",
        "I truly am sorry. Can you find it in your heart to forgive me?",
        "I never meant to hurt you. Please forgive me.",
        "I'm sorry for my behavior. Will you forgive me?",
        "My apologies. Can you forgive me?",
        "I'm really sorry. Please forgive me.",
        "I am genuinely sorry. Will you forgive me?",
        "I am extremely sorry. Please forgive me."
    ];
    return messages[count - 1] || "I am sorry! Please forgive me.";
}

function endWithApology() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = "I am extremely sorry for my behavior. I only did that because of my bad state of mind. I love you very much, more than my own life. You are everything to me and will always be everything for me. Please forgive me!";
    options.innerHTML = '<button onclick="forgiveMe()">Forgiven</button>';
}

function forgiveMe() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    document.body.style.backgroundColor = 'pink';
    question.innerHTML = `<canvas id="drawingCanvas" width="600" height="400"></canvas>`;
    options.innerHTML = '<button onclick="exitGame()">Exit</button>';
    drawFlowerAndPuppy();
}

function lovingForBoyfriend() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = 'What makes you remember me?';
    options.innerHTML = `
        <button onclick="lovingFollowUp('memory')">Memories</button>
        <button onclick="lovingFollowUp('miss')">Missing you</button>`;
}

function lovingFollowUp(reason) {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    if (reason === 'memory') {
        question.textContent = 'Why do those memories make you feel loving?';
        options.innerHTML = `
            <button onclick="finalLovingResponse('good times')">The good times we shared</button>
            <button onclick="finalLovingResponse('support')">The support you gave me</button>`;
    } else if (reason === 'miss') {
        question.textContent = 'Why are you missing me?';
        options.innerHTML = `
            <button onclick="finalLovingResponse('presence')">Your presence</button>
            <button onclick="finalLovingResponse('talks')">Our talks</button>`;
    }
}

function finalLovingResponse(reason) {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = `I understand. I wish I could be there for you, but I am always thinking of you.`;
    options.innerHTML = '<button onclick="romanticGesture()">Send Romantic Gesture</button>';
}

function romanticGesture() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = "Sending virtual hugs and kisses. Remember, I love you so much!";
    options.innerHTML = '<button onclick="restart()">Restart</button>';
}

function getAdvice(mood, reason) {
    const advice = {
        'angry': {
            'family': "Take a deep breath and try to communicate openly with your family.",
            'boyfriend': "Let's work on this together. I am here for you.",
            'friends': "Talk to your friends and clear any misunderstandings.",
            'god': "Have faith and stay positive."
        },
        'sad': {
            'family': "Spend some quality time with your family. It can make a big difference.",
            'boyfriend': "I am here to support you. Let's talk it out.",
            'friends': "Reach out to your friends. They care about you.",
            'god': "Pray and seek comfort in your beliefs."
        },
        'loving': {
            'family': "Show your family how much you care with a small gesture.",
            'boyfriend': "Let's plan a special date together!",
            'friends': "Express your appreciation to your friends with a heartfelt message.",
            'god': "Feel blessed and grateful for the love in your heart."
        },
        'killer': {
            'family': "Try to cool down and find a constructive way to address your feelings.",
            'boyfriend': "Let's find a way to channel this energy positively.",
            'friends': "Take a step back and assess the situation calmly.",
            'god': "Seek inner peace and clarity."
        },
        'normal': "It's great to hear you're feeling normal. Keep up the positive vibes!"
    };
    return advice[mood][reason] || advice['normal'];
}

function tellJoke() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = "Why don't scientists trust atoms? Because they make up everything!";
    options.innerHTML = '<button onclick="restart()">Restart</button>';
}

function restart() {
    location.reload();
}

function drawFlowerAndPuppy() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    // Draw a better flower
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(300, 200, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(300, 240);
    ctx.lineTo(300, 340);
    ctx.stroke();

    ctx.fillStyle = 'red';
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(300, 200);
        let angle = i * (Math.PI / 4);
        let x = 300 + 80 * Math.cos(angle);
        let y = 200 + 80 * Math.sin(angle);
        ctx.lineTo(x, y);
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw a better puppy
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(150, 300, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(135, 290, 5, 0, 2 * Math.PI);
    ctx.arc(165, 290, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(150, 310, 10, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.arc(450, 300, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(435, 290, 5, 0, 2 * Math.PI);
    ctx.arc(465, 290, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(450, 310, 10, 0, Math.PI);
    ctx.stroke();
}

function exitGame() {
    let question = document.getElementById('question');
    let options = document.getElementById('options');

    question.textContent = "Thank you for playing! I hope you feel better now.";
    options.innerHTML = '<button onclick="restart()">Restart</button>';
}
