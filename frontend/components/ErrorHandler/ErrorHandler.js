import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { View, StyleSheet, Button, Text } from "react-native";


const myErrorHandler = (error) => {
    // console.log('line7:', error);
  // Do something with the error
  // E.g. reporting errorr using sentry ( see part 3)
};

function ErrorFallback({error, resetErrorBoundary }) {
    console.log('line13:', error);
  return (
    <View style={[styles.container]}>
        <Text style={styles.msgText}>{error.myMessage ? error.myMessage : "Something went wrong"}</Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
    </View>
  );
}

export const ErrorHandler = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
  },
  msgText: {
    textAlign: 'center'
  }
});