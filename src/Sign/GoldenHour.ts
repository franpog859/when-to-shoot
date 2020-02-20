import SunCalc from 'suncalc'

interface GoldenHourTimes {
    morningGoldenHourStarts: Date;
    morningGoldenHourEnds: Date;
    eveningGoldenHourStarts: Date;
    eveningGoldenHourEnds: Date;
}

interface SignTexts {
    suggestion: string;
    information: string;
    time?: string;
}

export function GetSignTexts(date: Date, position?: Position): SignTexts {
    if (!position) return {
        suggestion: 'Enable location!',
        information: 'I need to know it to get to know your golden hour.'
    }

    const goldenHours = GetGoldenHours(date, position)

    if (date.getTime() >= goldenHours.morningGoldenHourStarts.getTime() && 
        date.getTime() < goldenHours.morningGoldenHourEnds.getTime()) {

        const timeToEnd = new Date(goldenHours.morningGoldenHourEnds.getTime() - date.getTime())

        return {
            suggestion: 'Right now!',
            information: 'Golden hour ends at ' + goldenHours.morningGoldenHourEnds.toLocaleTimeString(),
            time: timeToEnd.toLocaleTimeString()
        }
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourStarts.getTime() && 
        date.getTime() < goldenHours.eveningGoldenHourEnds.getTime()) {

        const timeToEnd = new Date(goldenHours.eveningGoldenHourEnds.getTime() - date.getTime())

        return {
            suggestion: 'Right now!',
            information: 'Golden hour ends at ' + goldenHours.eveningGoldenHourEnds.toLocaleTimeString(),
            time: timeToEnd.toLocaleTimeString()
        }
    }

    if (date.getTime() < goldenHours.morningGoldenHourStarts.getTime()) {
        const timeToStart = new Date(goldenHours.morningGoldenHourStarts.getTime() - date.getTime())

        return {
            suggestion: 'Wait for it...',
            information: 'Golden hour starts at ' + goldenHours.morningGoldenHourStarts.toLocaleTimeString(),
            time: timeToStart.toLocaleTimeString()
        }
    }

    if (date.getTime() < goldenHours.eveningGoldenHourStarts.getTime()) {
        const timeToStart = new Date(goldenHours.eveningGoldenHourStarts.getTime() - date.getTime())

        return {
            suggestion: 'Wait for it...',
            information: 'Golden hour starts at ' + goldenHours.eveningGoldenHourStarts.toLocaleTimeString(),
            time: timeToStart.toLocaleTimeString()
        }
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourEnds.getTime()) {
        const nextMorningGoldenHourStart = new Date(goldenHours.morningGoldenHourStarts.getTime() + (1000 * 60 * 60 * 24))
        const timeToStart = new Date(nextMorningGoldenHourStart.getTime() - date.getTime())

        return {
            suggestion: 'Wait for it...',
            information: 'Golden hour starts at ' + nextMorningGoldenHourStart.toLocaleTimeString(),
            time: timeToStart.toLocaleTimeString()
        }
    }

    return {
        suggestion: 'Something went wrong :(',
        information: 'Try to refresh the app!'
    }
}

function GetGoldenHours(date: Date, position: Position): GoldenHourTimes {
    const times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude)

    return {
        morningGoldenHourStarts: times.sunriseEnd,
        morningGoldenHourEnds: times.goldenHourEnd,
        eveningGoldenHourStarts: times.goldenHour,
        eveningGoldenHourEnds: times.sunsetStart,
    }
}