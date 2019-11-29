
const OracleList = require( './OracleList' );

let majorPlotTwist = new OracleList( "Major Plot Twist" );
majorPlotTwist.registerResult( 1, 5, "It was all a diversion." );
majorPlotTwist.registerResult( 6, 10, "A dark secret is revealed." );
majorPlotTwist.registerResult( 11, 15, "A trap is sprung." );
majorPlotTwist.registerResult( 16, 20, "An assumption is revealed to be false." );
majorPlotTwist.registerResult( 21, 25, "A secret alliance is revealed." );
majorPlotTwist.registerResult( 26, 30, "Your actions benefit an enemy." );
majorPlotTwist.registerResult( 31, 35, "Someone returns unexpectedly." );
majorPlotTwist.registerResult( 36, 40, "A more dangerous foe is revealed." );
majorPlotTwist.registerResult( 41, 45, "You and an enemy share a common goal." );
majorPlotTwist.registerResult( 46, 50, "A true identity is revealed." );
majorPlotTwist.registerResult( 51, 55, "You are betrayed by someone who was trusted." );
majorPlotTwist.registerResult( 56, 60, "You are too late." );
majorPlotTwist.registerResult( 61, 65, "The true enemy is revealed." );
majorPlotTwist.registerResult( 66, 70, "The enemy gains new allies." );
majorPlotTwist.registerResult( 71, 75, "A new fanger appears." );
majorPlotTwist.registerResult( 76, 80, "Someone or something goes missing." );
majorPlotTwist.registerResult( 81, 85, "The truth of a relationaship is revealed." );
majorPlotTwist.registerResult( 86, 90, "Two seemingly unrelated situations are shown to be connected." );
majorPlotTwist.registerResult( 91, 95, "Unexpected powers or abilities are revealed." );
majorPlotTwist.registerResult( 96, 100, "*ROLL-TWICE*" );

module.exports = majorPlotTwist;
