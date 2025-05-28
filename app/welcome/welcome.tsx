import {
    H1,
    H3,
    H4,
    H5,
    H2,
    Caption,
    TextCardItem,
    TextLead,
    TextBody,
    TextButton,
    TextGrey,
    TextSubtle,
} from '~/components';

export function Welcome() {
    return (
        <main className="flex flex-col items-center justify-center pt-16 pb-4">
            <H1>Hello World I am Here</H1>
            <H2>Hello World I am Here</H2>
            <H3>Hello World I am Here</H3>
            <H4>Hello World I am Here</H4>
            <H5>Hello World I am Here</H5>

            <TextCardItem>TextCardItem</TextCardItem>
            <br />
            <TextLead>TextLead</TextLead>
            <br />
            <TextBody>TextBody</TextBody>
            <br />
            <TextButton>TextButton</TextButton>
            <br />

            <TextGrey>TextGrey</TextGrey>
            <br />
            <TextSubtle>TextSubtle</TextSubtle>
            <br />
            <Caption>Caption</Caption>
        </main>
    );
}
