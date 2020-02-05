import React, { Component } from 'react';
import { Text, View, SectionList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { observer, Observer, inject, Provider } from "mobx-react";
import {
    Content,
    Header,
    Item,
    Title,
    Spinner,
    Button,
    ListItem,
    Left,
    Right,
    Body,
    Icon,
    Container,
    Input,
    Label
} from "native-base";
@inject("TurListesiStore")
export default class List extends Component {

    constructor(props) {
        super(props);
        this.props.TurListesiStore.loadList();
    }

    renderItem = ({item}) => {
        let headerIsValid = false;
        let enLt = item.enX + " / " + item.ltX;
        let header = "";
        return (
          <Observer>
            {() => (
              <ListItem style={{ marginLeft: 0, paddingLeft: 10, height: 60 }} >
                <Body>
    
                  <Text style={{ fontWeight: "bold" }}>{item.trX}</Text>
                  <Text style={{ color: "#b9b9b9", fontSize: 10 }}>{item.enX} / {item.ltX}</Text>
    
                </Body>
                <Right>
                  {item.btnLevel == 0 ? (
                    <TouchableOpacity
                      transparent
                      style={{
                        width: 250,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                      onPress={async () => {
                        Keyboard.dismiss();
                        await this.props.TurListesiStore.seciliTurAdd(
                          item.kod,
                          item.trX
                        );
                      }}
    
                    >
                      <Icon
                        type="MaterialIcons"
                        name="library-add"
                        style={{ color: "#fe8a35" }}
                        size={250}
                      />
                    </TouchableOpacity>
                  ) : (
                      <View
                        style={{
                          width: 150,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        <Item>
                          <Icon
                            type="MaterialCommunityIcons"
                            name="delete"
                            size={150}
                            style={{ color: "#fe8a35" }}
                            onPress={async () => {
                              Keyboard.dismiss();
                              await this.props.TurListesiStore.seciliTurDelete(
                                item.kod
                              );
                            }}
                          />
                          <Input
                            style={{
                              height: 38,
                              fontSize: 14,
                              textAlign: "center",
                              color: "#333"
                            }}
                            placeholder={item.tursayi == null ? "G" : item.tursayi}
                            placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red' }}
                            placeholderTextColor="black"
                            defaultValue={item.tursayi == "G" ? null : item.tursayi}
                            onChangeText={value => {
                              this.props.TurListesiStore.seciliTurSayisiniArttir(
                                item.kod,
                                value
                              );
                            }}
                            keyboardType={"numeric"}
                          />
                        </Item>
                      </View>
                    )}
                </Right>
              </ListItem>
            )}
          </Observer>
    
        );
    
      };

      renderHeader=({ section: { title } })=>{
       
        return(

            <Text style={styles.header}>{title}</Text>
        );
      }

    render() {
        const { TurListesiStore } = this.props;
        console.log("xsxs", TurListesiStore.liste);

        return (
            <Container style={styles.container}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {TurListesiStore.loading ?
                        <SectionList
                            sections={TurListesiStore.filteredx}
                            keyExtractor={(item, index) => item + index}
                            renderItem={this.renderItem}
                            style={{ width: 380 }}
                            renderSectionHeader={this.renderHeader}
                        /> : <Text>"Yükleniyor"</Text>

                    }
                </View>
            </Container>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: { backgroundColor: '#333', color: 'white', paddingHorizontal: 10, paddingVertical: 7 },
    seciliListText: {
        fontSize: 11,
    },
    seciliListBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 50,
        backgroundColor: '#fe8a35',
        marginRight: 10

    }
});
