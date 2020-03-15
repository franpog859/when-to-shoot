import { GetSignContent } from './SignContent'

const minute = 1000 * 60
const hour = minute * 60

function newPosition(latitude?: number, longitude?: number): Position {
    return {
        coords: {
            accuracy: 0,
            altitude: null, 
            altitudeAccuracy: null,
            heading: null,
            latitude: latitude || 0,
            longitude: longitude || 0,
            speed: null,
        },
        timestamp: 0,
    }
}

test('asks for enabling location if position is undefined', () => {
    // given
    const date = new Date(0)
    const position = undefined

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Allow location!");
    expect(signContent.information).toEqual("Click on the lock near the website address!");
    expect(signContent.isGoldenHour).toEqual(false);
    expect(signContent.timer).toEqual(undefined);
    expect(signContent.goldenHourPercent).toEqual(undefined);
});

test('suggests to wait if the time is before the first golden hour', () => {
    // given
    const date = new Date(0)
    const position = newPosition(0, 0)

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Wait for it...");
    expect(signContent.information).toContain("AM");
    expect(signContent.isGoldenHour).toEqual(false);
    expect(signContent.timer).not.toEqual(undefined);
    expect(signContent.goldenHourPercent).not.toEqual(undefined);
});

test('says right now at the first golden hour', () => {
    // given
    const date = new Date(hour * 6 + minute * 15)
    const position = newPosition(0, 0)

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Right now!");
    expect(signContent.information).toContain("AM");
    expect(signContent.isGoldenHour).toEqual(true);
    expect(signContent.timer).not.toEqual(undefined);
    expect(signContent.goldenHourPercent).not.toEqual(undefined);
});

test('suggests to wait if the time is before the second golden hour', () => {
    // given
    const date = new Date(hour * 16)
    const position = newPosition(0, 0)

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Wait for it...");
    expect(signContent.information).toContain("PM");
    expect(signContent.isGoldenHour).toEqual(false);
    expect(signContent.timer).not.toEqual(undefined);
    expect(signContent.goldenHourPercent).not.toEqual(undefined);
});

test('says right now at the second golden hour', () => {
    // given
    const date = new Date(hour * 18)
    const position = newPosition(0, 0)

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Right now!");
    expect(signContent.information).toContain("PM");
    expect(signContent.isGoldenHour).toEqual(true);
    expect(signContent.timer).not.toEqual(undefined);
    expect(signContent.goldenHourPercent).not.toEqual(undefined);
});

test('suggests to wait if the time is after the second golden hour', () => {
    // given
    const date = new Date(hour * 20)
    const position = newPosition(0, 0)

    // when
    const signContent = GetSignContent(date, position)

    // then
    expect(signContent.suggestion).toEqual("Wait for it...");
    expect(signContent.information).toContain("AM");
    expect(signContent.isGoldenHour).toEqual(false);
    expect(signContent.timer).not.toEqual(undefined);
    expect(signContent.goldenHourPercent).not.toEqual(undefined);
});

// TODO: Implement a workaround for the polar areas where SunCalc does not always 
//       work. In these places may be just no golden hours at all for many days 
//       straight. Simple solution is to iterate over the next days and find the 
//       next golden hour. It could take more time though.
// test('works also for polar areas', () => {
//     // given
//     const date = new Date(0)
//     const position = newPosition(80, 0)

//     // when
//     const signContent = GetSignContent(date, position)

//     // then
//     expect(signContent.suggestion).not.toContain("Something went wrong :(");
// });
